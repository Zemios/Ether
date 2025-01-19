import { PostsService } from './posts.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Get()
  findAll(@Query('page') page: number | string = 1, @Query('limit') limit: number | string = 10) {
    return this.postsService.findAll(page, limit);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(parseInt(id));
  }

  @Get('/user/:user_id')
  findAllByUser(@Param('user_id') user_id: string, @Query('page') page: number | string = 1, @Query('limit') limit: number | string = 10) {
    return this.postsService.findAllByUser(parseInt(user_id), page, limit);
  }

  @Post()
  @Auth(Role.USER)
  create(@Body() createPostDto: CreatePostDto, @ActiveUser() user: UserActiveInterface): Promise<PostEntity> {
    return this.postsService.create(createPostDto, user);
  }

  @Put('/:id')
  @Auth(Role.USER)
  update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.update(parseInt(id), updatePostDto);
  }

  @Delete('/:id')
  @Auth(Role.USER)
  remove(@Param('id') id: string, @ActiveUser() user: UserActiveInterface) {
    return this.postsService.remove(parseInt(id), user);
  }
}
