import { Module } from '@nestjs/common';
import { UserProgressController } from './user-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProgress } from './models/user-progress.entity';
import { UserProgressService } from './user-progress.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProgress])],
  controllers: [UserProgressController],
  providers: [UserProgressService],
})
export class UserProgressModule { }
