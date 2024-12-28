import { UsersLikesService } from './users-likes.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserLikeDto } from './dto/create-user-like-dto';
import { UserLike } from './entities/user-like.entity';

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

  @Post()
  create(@Body() createLikeDto: CreateUserLikeDto): Promise<UserLike> {
    return this.usersLikesService.create(createLikeDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateLikeDto: CreateUserLikeDto): Promise<UserLike> {
    return this.usersLikesService.update(parseInt(id), updateLikeDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersLikesService.remove(parseInt(id));
  }
}
