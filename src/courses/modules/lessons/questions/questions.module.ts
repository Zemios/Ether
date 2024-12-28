import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule { }
