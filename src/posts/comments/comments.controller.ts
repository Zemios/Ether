import { CommentsService } from './comments.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

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
  @Auth(Role.USER)
  create(@Body() createCommentDto: CreateCommentDto, @ActiveUser() user: UserActiveInterface): Promise<Comment> {
    return this.commentsService.create(createCommentDto, user);
  }

  @Put('/comments/:id')
  @Auth(Role.USER)
  update(@Param('id') id: string, @Body() updateCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.update(parseInt(id), updateCommentDto);
  }

  @Delete('/comments/:id')
  @Auth(Role.USER)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(parseInt(id));
  }
}
