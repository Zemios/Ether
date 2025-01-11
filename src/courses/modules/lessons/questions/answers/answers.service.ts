import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer)
        private readonly answerRepository: Repository<Answer>,
    ) { }

    async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
        const answer = this.answerRepository.create(createAnswerDto);
        return await this.answerRepository.save(answer);
    }

    async findAll(): Promise<Answer[]> {
        return await this.answerRepository.find();
    }

    async findOne(id: number): Promise<Answer> {
        return await this.answerRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.answerRepository.delete(id);
    }
}
