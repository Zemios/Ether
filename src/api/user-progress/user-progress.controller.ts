import { UserProgressService } from './user-progress.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserProgressDto } from './models/create-user-progress-dto';
import { UserProgress } from './models/user-progress.entity';

@Controller()
export class UserProgressController {
    constructor(private userProgressService: UserProgressService) { }

    @Get()
    findAll() {
        return this.userProgressService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.userProgressService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() createUserProgressDto: CreateUserProgressDto): Promise<UserProgress> {
        return this.userProgressService.create(createUserProgressDto);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() updateUserProgressDto: CreateUserProgressDto): Promise<UserProgress> {
        return this.userProgressService.update(parseInt(id), updateUserProgressDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.userProgressService.remove(parseInt(id));
    }
}
