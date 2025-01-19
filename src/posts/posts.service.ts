import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) { }

  async findAll(page: number | string = 1, limit: number | string = 10): Promise<PostDto[]> {
    limit = Number(limit)
    const skip = (Number(page) - 1) * Number(limit);
    if (isNaN(skip) || isNaN(limit)) {
      throw new BadRequestException('Invalid page or limit');
    }
    const posts = await this.postRepository.find({
      relations: ['user', 'comments', 'likes'],
      order: { 'creation_date': 'DESC' },
      take: limit,
      skip,
    });
    return posts.map(post => ({
      id: post.id,
      content: post.content,
      creation_date: post.creation_date,
      user: {
        id: post.user.id,
        name: post.user.name,
        profile_picture: post.user.profile_picture,
      },
      comments: post.comments,
      likes: post.likes,
    }));
  }

  async findOne(id: number): Promise<PostDto | null> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'comments', 'likes'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return {
      id: post.id,
      content: post.content,
      creation_date: post.creation_date,
      user: {
        id: post.user.id,
        name: post.user.name,
        profile_picture: post.user.profile_picture,
      },
      comments: post.comments,
      likes: post.likes,
    };
  }

  async findAllByUser(userId: number, page: number | string = 1, limit: number | string = 10): Promise<PostDto[]> {
    limit = Number(limit);
    const skip = (Number(page) - 1) * Number(limit);

    if (isNaN(skip) || isNaN(limit)) {
      throw new BadRequestException('Invalid page or limit');
    }

    const posts = await this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'comments', 'likes'],
      order: { creation_date: 'DESC' },
      take: limit,
      skip,
    });

    return posts.map(post => ({
      id: post.id,
      content: post.content,
      creation_date: post.creation_date,
      user: {
        id: post.user.id,
        name: post.user.name,
        profile_picture: post.user.profile_picture,
      },
      comments: post.comments,
      likes: post.likes,
    }));
  }


  async remove(id: number, user: UserActiveInterface): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.user_id !== user.id) {
      throw new UnauthorizedException('You can only delete your own posts');
    }
    await this.postRepository.delete(id);
  }

  create(createPostDto: CreatePostDto, user: UserActiveInterface): Promise<Post> {
    return this.postRepository.save({
      ...createPostDto,
      user_id: user.id,
    });
  }

  async update(id: number, updatePostDto: CreatePostDto): Promise<Post> {
    await this.postRepository.update(id, updatePostDto);
    return this.postRepository.findOneBy({ id });
  }
}
