import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { Like } from './models/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeService } from './like.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  controllers: [LikeController],
  providers: [LikeService]
})
export class LikeModule { }
