import { IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateLessonDto {
  @IsOptional()
  @IsNumber()
  module_id?: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  exercise?: string;

  @IsNumber()
  lesson_order: number;
}
