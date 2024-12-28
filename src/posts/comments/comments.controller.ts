import { CommentsService } from './comments.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment-dto';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) { }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.update(parseInt(id), updateCommentDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(parseInt(id));
  }
}
