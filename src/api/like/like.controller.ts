import { LikeService } from './like.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateLikeDto } from './models/create-like-dto';
import { Like as LikeEntity } from './models/like.entity';

@Controller()
export class LikeController {
    constructor(private likeService: LikeService) { }

    @Get()
    findAll() {
        return this.likeService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.likeService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() createLikeDto: CreateLikeDto): Promise<LikeEntity> {
        return this.likeService.create(createLikeDto);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() updateLikeDto: CreateLikeDto): Promise<LikeEntity> {
        return this.likeService.update(parseInt(id), updateLikeDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.likeService.remove(parseInt(id));
    }
}
