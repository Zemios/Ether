import { LessonsService } from 'src/infraestructure/services/learning/lessons/lessons.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateLessonDto } from 'src/application/learning/lessons/dtos/create-lesson.dto';
import { Lesson as LessonEntity } from 'src/domain/learning/lessons/lesson.entity';
import { Auth } from 'src/interfaces/decorators/auth/auth.decorator';
import { Role } from 'src/domain/users/role.enum';

@Auth(Role.USER)
@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) { }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createLessonDto: CreateLessonDto): Promise<LessonEntity> {
    return this.lessonsService.create(createLessonDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateLessonDto: CreateLessonDto): Promise<LessonEntity> {
    return this.lessonsService.update(parseInt(id), updateLessonDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(parseInt(id));
  }
}
