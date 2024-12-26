import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProject } from './models/user-project.entity';
import { CreateUserProjectDto } from './models/create-user-project-dto';

@Injectable()
export class UserProjectService {
    constructor(
        @InjectRepository(UserProject)
        private userProjectRepository: Repository<UserProject>,
    ) { }

    findAll(): Promise<UserProject[]> {
        return this.userProjectRepository.find({ relations: ['user', 'project'] });
    }

    findOne(id: number): Promise<UserProject | null> {
        return this.userProjectRepository.findOne({
            where: { id },
            relations: ['user', 'project'],
        });
    }

    async remove(id: number): Promise<void> {
        await this.userProjectRepository.delete(id);
    }

    create(userProjectData: CreateUserProjectDto): Promise<UserProject> {
        return this.userProjectRepository.save(userProjectData);
    }

    async update(id: number, userProjectData: CreateUserProjectDto): Promise<UserProject> {
        await this.userProjectRepository.update(id, userProjectData);
        return this.userProjectRepository.findOneBy({ id });
    }
}
