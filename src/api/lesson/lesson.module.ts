import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { Lesson } from './models/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonService } from './lesson.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  controllers: [LessonController],
  providers: [LessonService]
})
export class LessonModule { }
