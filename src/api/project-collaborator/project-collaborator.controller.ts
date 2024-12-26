import { ProjectCollaboratorService } from './project-collaborator.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectCollaboratorDto } from './models/create-project-collaborator-dto';
import { ProjectCollaborator } from './models/project-collaborator.entity';

@Controller()
export class ProjectCollaboratorController {
    constructor(private projectCollaboratorService: ProjectCollaboratorService) { }

    @Get()
    findAll() {
        return this.projectCollaboratorService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.projectCollaboratorService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() createProjectCollaboratorDto: CreateProjectCollaboratorDto): Promise<ProjectCollaborator> {
        return this.projectCollaboratorService.create(createProjectCollaboratorDto);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() updateProjectCollaboratorDto: CreateProjectCollaboratorDto): Promise<ProjectCollaborator> {
        return this.projectCollaboratorService.update(parseInt(id), updateProjectCollaboratorDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.projectCollaboratorService.remove(parseInt(id));
    }
}
