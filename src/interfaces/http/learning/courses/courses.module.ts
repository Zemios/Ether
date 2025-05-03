import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/domain/learning/courses/course.entity';
import { CoursesService } from 'src/infraestructure/services/learning/courses/courses.service';
import { ModulesModule } from '../modules/modules.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), ModulesModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule { }
