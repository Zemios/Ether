import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProgress } from './models/user-progress.entity';
import { CreateUserProgressDto } from './models/create-user-progress-dto';

@Injectable()
export class UsersProgressService {
  constructor(
    @InjectRepository(UserProgress)
    private userProgressRepository: Repository<UserProgress>,
  ) { }

  findAll(): Promise<UserProgress[]> {
    return this.userProgressRepository.find({ relations: ['user', 'course', 'module', 'lesson'] });
  }

  findOne(id: number): Promise<UserProgress | null> {
    return this.userProgressRepository.findOne({
      where: { id },
      relations: ['user', 'course', 'module', 'lesson'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.userProgressRepository.delete(id);
  }

  create(userProgressData: CreateUserProgressDto): Promise<UserProgress> {
    return this.userProgressRepository.save(userProgressData);
  }

  async update(id: number, userProgressData: CreateUserProgressDto): Promise<UserProgress> {
    await this.userProgressRepository.update(id, userProgressData);
    return this.userProgressRepository.findOneBy({ id });
  }
}
