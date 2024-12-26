import { LessonService } from './lesson.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateLessonDto } from './models/create-lesson-dto';
import { Lesson as LessonEntity } from './models/lesson.entity';

@Controller()
export class LessonController {
    constructor(private lessonService: LessonService) { }

    @Get()
    findAll() {
        return this.lessonService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.lessonService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() createLessonDto: CreateLessonDto): Promise<LessonEntity> {
        return this.lessonService.create(createLessonDto);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() updateLessonDto: CreateLessonDto): Promise<LessonEntity> {
        return this.lessonService.update(parseInt(id), updateLessonDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.lessonService.remove(parseInt(id));
    }
}
