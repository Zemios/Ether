import { UserLikeService } from './user-like.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserLikeDto } from './models/create-user-like-dto';
import { UserLike } from './models/user-like.entity';

@Controller()
export class UserLikeController {
    constructor(private likeService: UserLikeService) { }

    @Get()
    findAll() {
        return this.likeService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.likeService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() createLikeDto: CreateUserLikeDto): Promise<UserLike> {
        return this.likeService.create(createLikeDto);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() updateLikeDto: CreateUserLikeDto): Promise<UserLike> {
        return this.likeService.update(parseInt(id), updateLikeDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.likeService.remove(parseInt(id));
    }
}
