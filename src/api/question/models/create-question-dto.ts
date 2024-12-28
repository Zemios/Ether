import { IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
    @IsNumber()
    lesson_id: number;

    @IsString()
    content: string;
}
