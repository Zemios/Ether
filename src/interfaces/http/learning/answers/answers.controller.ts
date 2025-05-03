import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { AnswersService } from 'src/infraestructure/services/learning/answers/answers.service';
import { CreateAnswerDto } from 'src/application/learning/answers/dtos/create-answer.dto';
import { Answer } from 'src/domain/learning/answers/answer.entity';
import { Auth } from 'src/interfaces/decorators/auth/auth.decorator';
import { Role } from 'src/domain/users/role.enum';

@Auth(Role.USER)
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
