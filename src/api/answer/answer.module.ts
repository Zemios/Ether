import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class QuestionModule {}
