import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './models/create-question-dto';
import { Question } from './models/question.entity';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) { }

    @Post()
    async create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
        return await this.questionsService.create(createQuestionDto);
    }

    @Get()
    async findAll(): Promise<Question[]> {
        return await this.questionsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Question> {
        return await this.questionsService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return await this.questionsService.remove(id);
    }
}
