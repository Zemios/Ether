import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from 'src/domain/learning/answers/answer.entity';
import { CreateAnswerDto } from 'src/application/learning/answers/dtos/create-answer.dto';

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
        const answer = await this.answerRepository.findOne({ where: { id } });
        if (!answer) {
            throw new Error(`Answer with ID ${id} not found`);
        }
        return answer;
    }

    async remove(id: number): Promise<void> {
        await this.answerRepository.delete(id);
    }
}
