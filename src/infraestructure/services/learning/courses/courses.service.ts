import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from 'src/domain/learning/courses/course.entity';
import { CreateCourseDto } from 'src/application/learning/courses/dtos/create-course.dto';
import { Module } from 'src/domain/learning/modules/module.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Module)
    private moduleRepository: Repository<Module>,
  ) { }

  findAll(): Promise<Course[]> {
    return this.courseRepository.find({ relations: ['modules', 'progress'] });
  }

  findOne(id: number): Promise<Course | null> {
    return this.courseRepository.findOne({
      where: { id },
      relations: ['modules', 'progress'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }

  create(createCourseDto: CreateCourseDto): Promise<Course> {
    const { modules, ...courseData } = createCourseDto;
    const course = this.courseRepository.create(courseData);
    course.modules = modules.map((moduleId) => this.moduleRepository.create({ id: moduleId }));
    return this.courseRepository.save(course);
  }

  async update(id: number, updateCourseDto: CreateCourseDto): Promise<Course> {
    const { modules, ...courseData } = updateCourseDto;
    await this.courseRepository.update(id, courseData);
    const course = await this.courseRepository.findOne({ where: { id }, relations: ['modules'] });
    if (!course) {
    throw new Error(`Course with ID ${id} not found`);
    }
    course.modules = modules.map((moduleId) => this.moduleRepository.create({ id: moduleId }));
    return this.courseRepository.save(course);
  }
}
