import { Module } from '@nestjs/common';
import { UsersLikesController } from './users-likes.controller';
import { UserLike } from './entities/user-like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersLikesService } from './users-likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserLike])],
  controllers: [UsersLikesController],
  providers: [UsersLikesService],
})
export class UsersLikesModule { }
