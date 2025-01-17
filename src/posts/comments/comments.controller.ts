import { CommentsService } from './comments.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('')
export class CommentsController {
  constructor(private commentsService: CommentsService) { }

  @Get('/comments')
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('/comments/:id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(parseInt(id));
  }
  @Get('/posts/:postId/comments')
  async findAllFromPost(
    @Param('postId') postId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5
  ) {
    return this.commentsService.findAllFromPost(parseInt(postId), page, limit);
  }

  @Get('/posts/:postId/comments/:id')
  findOneFromPost(
    @Param('postId') postId: string,
    @Param('id') id: string
  ) {
    return this.commentsService.findOneFromPost(parseInt(postId), parseInt(id));
  }

  @Post('/comments')
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }

  @Put('/comments/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.update(parseInt(id), updateCommentDto);
  }

  @Delete('/comments/:id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(parseInt(id));
  }
}
