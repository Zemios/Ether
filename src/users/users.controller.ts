import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { UpdateUserDto } from './dto/update-user.dto';
import { existsSync, unlinkSync } from 'fs';
import * as sharp from 'sharp';
import * as multer from 'multer';

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
    storage: multer.memoryStorage(), // Usar buffer en memoria
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
      const compressedFilename = `compressed-${Date.now()}.webp`;
      const compressedFilePath = resolve(`./uploads/profile-pics/${compressedFilename}`);

      // Procesar la imagen desde el buffer
      await sharp(file.buffer)  // file.buffer se usa aquí
        .resize(64, 64)
        .webp({ quality: 80 })
        .toFile(compressedFilePath);

      // Eliminar la imagen antigua si existe
      if (user.profile_picture) {
        const oldImagePath = resolve(`./uploads/profile-pics/${user.profile_picture}`);
        if (existsSync(oldImagePath)) {
          try {
            unlinkSync(oldImagePath);
            console.log(`Imagen antigua ${oldImagePath} eliminada.`);
          } catch (err) {
            console.error('Error al eliminar la imagen antigua:', err);
          }
        }
      }

      updateUserDto.profile_picture = compressedFilename;
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
