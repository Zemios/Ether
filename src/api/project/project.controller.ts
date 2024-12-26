import { ProjectService } from './project.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from './models/create-project-dto';
import { Project } from './models/project.entity';

@Controller('projects')
export class ProjectController {
    constructor(private projectService: ProjectService) { }

    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.projectService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectService.create(createProjectDto);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() updateProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectService.update(parseInt(id), updateProjectDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.projectService.remove(parseInt(id));
    }
}
