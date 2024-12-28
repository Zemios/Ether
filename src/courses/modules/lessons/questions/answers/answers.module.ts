import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule { }
