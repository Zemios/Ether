import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) { }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  findOne(id: number): Promise<Project | null> {
    return this.projectRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  create(projectData: CreateProjectDto): Promise<Project> {
    return this.projectRepository.save(projectData);
  }

  async update(id: number, projectData: CreateProjectDto): Promise<Project> {
    await this.projectRepository.update(id, projectData);
    return this.projectRepository.findOneBy({ id });
  }
}
