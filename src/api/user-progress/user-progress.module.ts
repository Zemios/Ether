import { Module } from '@nestjs/common';
import { UserProgressController } from './user-progress.controller';
import { UserProjectService } from '../user-project/user-project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProgress } from './models/user-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProgress])],
  controllers: [UserProgressController],
  providers: [UserProjectService],
})
export class UserProgressModule { }
