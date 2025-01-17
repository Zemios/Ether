import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  user_id: number;

  @IsString()
  @MaxLength(560)
  content: string;
}
