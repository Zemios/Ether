import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectCollaborator } from './models/project-collaborator.entity';
import { CreateProjectCollaboratorDto } from './models/create-project-collaborator-dto';

@Injectable()
export class ProjectCollaboratorService {
    constructor(
        @InjectRepository(ProjectCollaborator)
        private projectCollaboratorRepository: Repository<ProjectCollaborator>,
    ) { }

    findAll(): Promise<ProjectCollaborator[]> {
        return this.projectCollaboratorRepository.find({ relations: ['project', 'user'] });
    }

    findOne(id: number): Promise<ProjectCollaborator | null> {
        return this.projectCollaboratorRepository.findOne({
            where: { id },
            relations: ['project', 'user'],
        });
    }

    async remove(id: number): Promise<void> {
        await this.projectCollaboratorRepository.delete(id);
    }

    create(projectCollaboratorData: CreateProjectCollaboratorDto): Promise<ProjectCollaborator> {
        return this.projectCollaboratorRepository.save(projectCollaboratorData);
    }

    async update(id: number, projectCollaboratorData: CreateProjectCollaboratorDto): Promise<ProjectCollaborator> {
        await this.projectCollaboratorRepository.update(id, projectCollaboratorData);
        return this.projectCollaboratorRepository.findOneBy({ id });
    }
}
