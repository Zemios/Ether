import { UserProjectService } from './user-project.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserProjectDto } from './models/create-user-project-dto';
import { UserProject } from './models/user-project.entity';

@Controller('users-projects')
export class UserProjectController {
  constructor(private userProjectService: UserProjectService) { }

  @Get()
  findAll() {
    return this.userProjectService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userProjectService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createUserProjectDto: CreateUserProjectDto): Promise<UserProject> {
    return this.userProjectService.create(createUserProjectDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateUserProjectDto: CreateUserProjectDto): Promise<UserProject> {
    return this.userProjectService.update(parseInt(id), updateUserProjectDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userProjectService.remove(parseInt(id));
  }
}
