import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './models/like.entity';
import { CreateLikeDto } from './models/create-like-dto';

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like)
        private likeRepository: Repository<Like>,
    ) { }

    findAll(): Promise<Like[]> {
        return this.likeRepository.find({ relations: ['user', 'post', 'news'] });
    }

    findOne(id: number): Promise<Like | null> {
        return this.likeRepository.findOne({
            where: { id },
            relations: ['user', 'post', 'news'],
        });
    }

    async remove(id: number): Promise<void> {
        await this.likeRepository.delete(id);
    }

    create(createLikeDto: CreateLikeDto): Promise<Like> {
        return this.likeRepository.save(createLikeDto);
    }

    async update(id: number, updateLikeDto: CreateLikeDto): Promise<Like> {
        await this.likeRepository.update(id, updateLikeDto);
        return this.likeRepository.findOneBy({ id });
    }
}
