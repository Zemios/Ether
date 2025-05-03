import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { QuestionsService } from 'src/infraestructure/services/learning/questions/questions.service';
import { CreateQuestionDto } from 'src/application/learning/questions/dtos/create-question.dto';
import { Question } from 'src/domain/learning/question/question.entity';
import { Auth } from 'src/interfaces/decorators/auth/auth.decorator';
import { Role } from 'src/domain/users/role.enum';

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
