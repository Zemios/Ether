import { Module as ModuleEntity } from './entities/module.entity';
import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesService } from './modules.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [TypeOrmModule],
})
export class ModulesModule { }
