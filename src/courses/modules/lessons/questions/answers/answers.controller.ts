import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './entities/answer.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

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
