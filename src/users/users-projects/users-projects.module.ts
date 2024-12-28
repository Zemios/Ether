import { Module } from '@nestjs/common';
import { UsersProjectsController } from './users-projects.controller';
import { UsersProjectsService } from './users-projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProject } from './entities/user-project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProject])],
  controllers: [UsersProjectsController],
  providers: [UsersProjectsService],
})
export class UsersProjectsModule { }
