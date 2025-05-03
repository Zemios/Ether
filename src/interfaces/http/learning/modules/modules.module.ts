import { Module as ModuleEntity } from 'src/domain/learning/modules/module.entity';
import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesService } from 'src/infraestructure/services/learning/modules/modules.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [TypeOrmModule],
})
export class ModulesModule { }
