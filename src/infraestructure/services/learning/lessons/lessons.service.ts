import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from 'src/domain/learning/lessons/lesson.entity';
import { CreateLessonDto } from 'src/application/learning/lessons/dtos/create-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) { }

  findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find({ relations: ['module', 'progress'] });
  }

  findOne(id: number): Promise<Lesson | null> {
    return this.lessonRepository.findOne({
      where: { id },
      relations: ['module', 'progress'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.lessonRepository.delete(id);
  }

  create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonRepository.save(createLessonDto);
  }

  async update(id: number, updateLessonDto: CreateLessonDto): Promise<Lesson> {
    await this.lessonRepository.update(id, updateLessonDto);
    const updatedLesson = await this.lessonRepository.findOneBy({ id });
    if (!updatedLesson) {
    throw new Error(`Lesson with ID ${id} not found after update`);
    }
    return updatedLesson;
  }
}
