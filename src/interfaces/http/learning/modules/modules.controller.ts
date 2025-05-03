import { ModulesService } from 'src/infraestructure/services/learning/modules/modules.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateModuleDto } from 'src/application/learning/modules/dtos/create-module.dto';
import { Module as ModuleEntity } from 'src/domain/learning/modules/module.entity';
import { Auth } from 'src/interfaces/decorators/auth/auth.decorator';
import { Role } from 'src/domain/users/role.enum';

@Auth(Role.USER)
@Controller('modules')
export class ModulesController {
  constructor(private modulesService: ModulesService) { }

  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createModuleDto: CreateModuleDto): Promise<ModuleEntity> {
    return this.modulesService.create(createModuleDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateModuleDto: CreateModuleDto): Promise<ModuleEntity> {
    return this.modulesService.update(parseInt(id), updateModuleDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.modulesService.remove(parseInt(id));
  }
}
