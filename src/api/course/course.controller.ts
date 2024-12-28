import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './models/create-course-dto';
import { Course } from './models/course.entity';

@Controller()
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.create(createCourseDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.update(parseInt(id), updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(parseInt(id));
  }
}
