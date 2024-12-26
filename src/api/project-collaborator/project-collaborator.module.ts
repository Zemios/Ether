import { Module } from '@nestjs/common';
import { ProjectCollaboratorController } from './project-collaborator.controller';
import { ProjectCollaboratorService } from './project-collaborator.service';
import { ProjectCollaborator } from './models/project-collaborator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectCollaborator])],
  controllers: [ProjectCollaboratorController],
  providers: [ProjectCollaboratorService],
})
export class ProjectCollaboratorModule { }
