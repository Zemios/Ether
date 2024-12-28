import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './models/create-answer-dto';
import { Answer } from './models/answer.entity';

@Controller('answers')
export class AnswersController {
    constructor(private readonly answersService: AnswersService) { }

    @Post()
    async create(@Body() createAnswerDto: CreateAnswerDto): Promise<Answer> {
        return await this.answersService.create(createAnswerDto);
    }

    @Get()
    async findAll(): Promise<Answer[]> {
        return await this.answersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Answer> {
        return await this.answersService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return await this.answersService.remove(id);
    }
}
