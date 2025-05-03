import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from 'src/infraestructure/services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
