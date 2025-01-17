import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  user_id: number;

  @IsString()
  @MaxLength(1000)
  content: string;
}
