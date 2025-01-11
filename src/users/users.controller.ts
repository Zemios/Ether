import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateUserDto } from './dto/update-user.dto';
import { unlinkSync } from 'fs';
import * as sharp from 'sharp';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Auth(Role.USER)
  @Put('/:id')
  @UseInterceptors(FileInterceptor('profile_picture', {
    storage: diskStorage({
      destination: './uploads/profile-pics',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.mimetype)) {
        return callback(new BadRequestException('Only images are allowed!'), false);
      }
      callback(null, true);
    },
    limits: { fileSize: 2 * 1024 * 1024 },
  }))
  async update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersService.findOne(parseInt(id));

    if (file) {
      const tempPath = `./uploads/profile-pics/compressed-${file.filename}`;

      await sharp(file.path)
        .resize(64, 64)
        .toFile(tempPath);

      if (user.profile_picture) {
        const oldImagePath = `./uploads/profile-pics/${user.profile_picture.split('/').pop()}`;
        try {
          unlinkSync(oldImagePath);
        } catch (err) {
          console.error('Error al eliminar la imagen antigua:', err);
        }
      }
      updateUserDto.profile_picture = `compressed-${file.filename}`;
    }

    if (updateUserDto.about_me || updateUserDto.name || updateUserDto.profile_picture || updateUserDto.title) {
      return this.usersService.update(parseInt(id), updateUserDto);
    }

    throw new BadRequestException('Blank Request');
  }

  @Auth(Role.USER)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
