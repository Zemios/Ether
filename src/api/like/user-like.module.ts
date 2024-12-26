import { Module } from '@nestjs/common';
import { UserLikeController } from './user-like.controller';
import { UserLike } from './models/user-like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLikeService } from './user-like.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserLike])],
  controllers: [UserLikeController],
  providers: [UserLikeService]
})
export class UserLikeModule { }
