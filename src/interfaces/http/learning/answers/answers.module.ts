import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersController } from './answers.controller';
import { AnswersService } from 'src/infraestructure/services/learning/answers/answers.service';
import { Module } from '@nestjs/common';
import { Answer } from 'src/domain/learning/answers/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule { }
