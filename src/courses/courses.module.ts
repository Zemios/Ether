import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './models/course.entity';
import { CoursesService } from './courses.service';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), ModulesModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule { }
