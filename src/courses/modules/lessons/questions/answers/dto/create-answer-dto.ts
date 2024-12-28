import { IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateAnswerDto {
    @IsNumber()
    question_id: number;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsBoolean()
    is_correct: boolean;
}
