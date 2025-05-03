import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { Lesson } from 'src/domain/learning/lessons/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsService } from 'src/infraestructure/services/learning/lessons/lessons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule { }
