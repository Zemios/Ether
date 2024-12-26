import { Module as ModuleEntity } from './models/module.entity';
import { Module } from '@nestjs/common';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleService } from './module.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity])],
  controllers: [ModuleController],
  providers: [ModuleService],
  exports: [TypeOrmModule]
})
export class ModuleModule { }
