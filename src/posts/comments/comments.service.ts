import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) { }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['post', 'user'] });
  }

  findOne(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['post', 'user'],
    });
  }
  async findAllFromPost(postId: number, page: number, limit: number) {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      order: { creation_date: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user'],
    });
  }

  async findOneFromPost(postId: number, id: number) {
    return this.commentRepository.find({
      where: { post: { id: postId }, id: id },
      relations: ['user'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }

  create(commentData: CreateCommentDto): Promise<Comment> {
    return this.commentRepository.save(commentData);
  }

  async update(id: number, commentData: CreateCommentDto): Promise<Comment> {
    await this.commentRepository.update(id, commentData);
    return this.commentRepository.findOneBy({ id });
  }
}
