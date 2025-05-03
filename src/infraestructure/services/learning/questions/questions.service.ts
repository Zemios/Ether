import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from 'src/domain/learning/question/question.entity';
import { CreateQuestionDto } from 'src/application/learning/questions/dtos/create-question.dto';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
    ) { }

    async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const question = this.questionRepository.create(createQuestionDto);
        return await this.questionRepository.save(question);
    }

    async findAll(): Promise<Question[]> {
        return await this.questionRepository.find();
    }

    async findOne(id: number): Promise<Question> {
        const question = await this.questionRepository.findOne({ where: { id } });
        if (!question) {
            throw new Error(`Question with ID ${id} not found`);
        }
        return question;
    }

    async remove(id: number): Promise<void> {
        await this.questionRepository.delete(id);
    }
}

