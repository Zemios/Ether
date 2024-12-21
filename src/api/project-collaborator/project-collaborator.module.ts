import { Module } from '@nestjs/common';
import { ProjectCollaboratorController } from './project-collaborator.controller';

@Module({
  controllers: [ProjectCollaboratorController]
})
export class ProjectCollaboratorModule {}
