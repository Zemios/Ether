import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './models/news.entity';
import { CreateNewsDto } from './models/create-news-dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  findAll(): Promise<News[]> {
    return this.newsRepository.find({ relations: ['author', 'likes'] });
  }

  findOne(id: number): Promise<News | null> {
    return this.newsRepository.findOne({
      where: { id },
      relations: ['author', 'likes'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.newsRepository.delete(id);
  }

  create(createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsRepository.save(createNewsDto);
  }

  async update(id: number, updateNewsDto: CreateNewsDto): Promise<News> {
    await this.newsRepository.update(id, updateNewsDto);
    return this.newsRepository.findOneBy({ id });
  }
}
