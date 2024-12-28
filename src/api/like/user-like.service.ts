import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLike } from './models/user-like.entity';
import { CreateUserLikeDto } from './models/create-user-like-dto';

@Injectable()
export class UserLikeService {
  constructor(
    @InjectRepository(UserLike)
    private likeRepository: Repository<UserLike>,
  ) {}

  findAll(): Promise<UserLike[]> {
    return this.likeRepository.find({ relations: ['user', 'post', 'news'] });
  }

  findOne(id: number): Promise<UserLike | null> {
    return this.likeRepository.findOne({
      where: { id },
      relations: ['user', 'post', 'news'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.likeRepository.delete(id);
  }

  create(createLikeDto: CreateUserLikeDto): Promise<UserLike> {
    return this.likeRepository.save(createLikeDto);
  }

  async update(id: number, updateLikeDto: CreateUserLikeDto): Promise<UserLike> {
    await this.likeRepository.update(id, updateLikeDto);
    return this.likeRepository.findOneBy({ id });
  }
}
