import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './models/course.entity';
import { CreateCourseDto } from './models/create-course-dto';
import { Module } from 'src/api/module/models/module.entity';
import { UserProgress } from 'src/api/user-progress/models/user-progress.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        @InjectRepository(Module)
        private moduleRepository: Repository<Module>,
        @InjectRepository(UserProgress)
        private userProgressRepository: Repository<UserProgress>,
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
        course.modules = modules.map(moduleId => this.moduleRepository.create({ id: moduleId }));
        return this.courseRepository.save(course);
    }

    async update(id: number, updateCourseDto: CreateCourseDto): Promise<Course> {
        const { modules, ...courseData } = updateCourseDto;
        await this.courseRepository.update(id, courseData);
        const course = await this.courseRepository.findOne({ where: { id }, relations: ['modules'] });
        course.modules = modules.map(moduleId => this.moduleRepository.create({ id: moduleId }));
        return this.courseRepository.save(course);
    }
}
