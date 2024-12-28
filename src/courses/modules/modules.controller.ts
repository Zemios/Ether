import { ModuleService } from './module.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateModuleDto } from './models/create-module-dto';
import { Module as ModuleEntity } from './models/module.entity';

@Controller('modules')
export class ModuleController {
  constructor(private moduleService: ModuleService) { }

  @Get()
  findAll() {
    return this.moduleService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createModuleDto: CreateModuleDto): Promise<ModuleEntity> {
    return this.moduleService.create(createModuleDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateModuleDto: CreateModuleDto): Promise<ModuleEntity> {
    return this.moduleService.update(parseInt(id), updateModuleDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.moduleService.remove(parseInt(id));
  }
}
