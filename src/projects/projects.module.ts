import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { Project } from './models/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule { }
