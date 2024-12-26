import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './models/comment.entity';
import { CreateCommentDto } from './models/create-comment-dto';

@Injectable()
export class CommentService {
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
