import { PostService } from './post.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePostDto } from './models/create-post-dto';
import { Post as PostEntity } from './models/post.entity';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(createPostDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.update(parseInt(id), updatePostDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.postService.remove(parseInt(id));
  }
}
