import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './models/course.entity';
import { CourseService } from './course.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule { }
