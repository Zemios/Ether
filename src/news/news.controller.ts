import { NewsService } from './news.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { News as NewsEntity } from './entities/news.entity';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) { }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    return this.newsService.create(createNewsDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateNewsDto: CreateNewsDto): Promise<NewsEntity> {
    return this.newsService.update(parseInt(id), updateNewsDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(parseInt(id));
  }
}
