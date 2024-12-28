import { PostsService } from './posts.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.update(parseInt(id), updatePostDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(parseInt(id));
  }
}
