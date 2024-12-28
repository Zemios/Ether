import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './models/post.entity';
import { CreatePostDto } from './models/create-post-dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) { }

  findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user', 'comments', 'likes'] });
  }

  findOne(id: number): Promise<Post | null> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['user', 'comments', 'likes'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }

  create(createPostDto: CreatePostDto): Promise<Post> {
    return this.postRepository.save(createPostDto);
  }

  async update(id: number, updatePostDto: CreatePostDto): Promise<Post> {
    await this.postRepository.update(id, updatePostDto);
    return this.postRepository.findOneBy({ id });
  }
}
