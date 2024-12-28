import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  user_id?: number;

  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @MaxLength(1000)
  content: string;
}
