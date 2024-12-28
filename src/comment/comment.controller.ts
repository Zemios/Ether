import { CommentService } from './comment.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCommentDto } from './models/create-comment-dto';
import { Comment } from './models/comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) { }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.update(parseInt(id), updateCommentDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(parseInt(id));
  }
}
