import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './models/course.entity';
import { CourseService } from './course.service';
import { ModuleModule } from '../module/module.module';
import { UserProgressModule } from '../user-progress/user-progress.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), ModuleModule, UserProgressModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule { }
