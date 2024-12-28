import { Module } from '@nestjs/common';
import { UserProjectController } from './user-project.controller';
import { UserProjectService } from './user-project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProject } from './models/user-project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProject])],
  controllers: [UserProjectController],
  providers: [UserProjectService],
})
export class UserProjectModule {}
