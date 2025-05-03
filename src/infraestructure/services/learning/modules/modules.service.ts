import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Module } from 'src/domain/learning/modules/module.entity';
import { CreateModuleDto } from 'src/application/learning/modules/dtos/create-module.dto';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Module)
    private moduleRepository: Repository<Module>,
  ) { }

  findAll(): Promise<Module[]> {
    return this.moduleRepository.find({ relations: ['course', 'lessons', 'progress'] });
  }

  findOne(id: number): Promise<Module | null> {
    return this.moduleRepository.findOne({
      where: { id },
      relations: ['course', 'lessons', 'progress'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.moduleRepository.delete(id);
  }

  create(createModuleDto: CreateModuleDto): Promise<Module> {
    return this.moduleRepository.save(createModuleDto);
  }

  async update(id: number, updateModuleDto: CreateModuleDto): Promise<Module> {
    await this.moduleRepository.update(id, updateModuleDto);
    const updatedModule = await this.moduleRepository.findOneBy({ id });
    if (!updatedModule) {
    throw new Error(`Module with ID ${id} not found after update`);
    }
    return updatedModule;
  }
}
