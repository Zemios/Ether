import { UsersProjectsService } from './users-projects.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserProjectDto } from './dto/create-user-project.dto';
import { UserProject } from './entities/user-project.entity';

@Controller('users-projects')
export class UsersProjectsController {
  constructor(private usersProjectsService: UsersProjectsService) { }

  @Get()
  findAll() {
    return this.usersProjectsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersProjectsService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createUserProjectDto: CreateUserProjectDto): Promise<UserProject> {
    return this.usersProjectsService.create(createUserProjectDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateUserProjectDto: CreateUserProjectDto): Promise<UserProject> {
    return this.usersProjectsService.update(parseInt(id), updateUserProjectDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersProjectsService.remove(parseInt(id));
  }
}
