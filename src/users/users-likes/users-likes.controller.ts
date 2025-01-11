import { UsersLikesService } from './users-likes.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserLikeDto } from './dto/create-user-like.dto';
import { UserLike } from './entities/user-like.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('likes')
export class UsersLikesController {
  constructor(private usersLikesService: UsersLikesService) { }

  @Get()
  findAll() {
    return this.usersLikesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersLikesService.findOne(parseInt(id));
  }

  @Auth(Role.USER)
  @Post()
  create(@Body() createLikeDto: CreateUserLikeDto): Promise<UserLike> {
    return this.usersLikesService.create(createLikeDto);
  }

  @Auth(Role.USER)
  @Put('/:id')
  update(@Param('id') id: string, @Body() updateLikeDto: CreateUserLikeDto): Promise<UserLike> {
    return this.usersLikesService.update(parseInt(id), updateLikeDto);
  }

  @Auth(Role.USER)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersLikesService.remove(parseInt(id));
  }
}
