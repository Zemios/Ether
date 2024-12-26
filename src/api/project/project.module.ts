import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { Project } from './models/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule { }
