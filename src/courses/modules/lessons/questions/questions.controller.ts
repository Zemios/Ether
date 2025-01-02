import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Auth(Role.USER)
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
