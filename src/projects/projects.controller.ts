import { ProjectsService } from './projects.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Auth(Role.USER)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) { }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.update(parseInt(id), updateProjectDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(parseInt(id));
  }
}
