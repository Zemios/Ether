import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CoursesService } from 'src/infraestructure/services/learning/courses/courses.service';
import { CreateCourseDto } from 'src/application/learning/courses/dtos/create-course.dto';
import { Course } from 'src/domain/learning/courses/course.entity';
import { Role } from 'src/domain/users/role.enum';
import { Auth } from 'src/interfaces/decorators/auth/auth.decorator';

@Auth(Role.USER)
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) { }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.update(parseInt(id), updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(parseInt(id));
  }
}
