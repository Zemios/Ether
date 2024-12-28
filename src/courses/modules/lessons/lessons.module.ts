import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { Lesson } from './models/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsService } from './lessons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule { }
