import { Module } from '@nestjs/common';
import { UsersProgressController } from './users-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProgress } from './models/user-progress.entity';
import { UsersProgressService } from './users-progress.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProgress])],
  controllers: [UsersProgressController],
  providers: [UsersProgressService],
  exports: [TypeOrmModule],
})
export class UsersProgressModule { }
