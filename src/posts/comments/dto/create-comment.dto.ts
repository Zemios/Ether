import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  post_id: number;

  @IsNumber()
  user_id: number;

  @IsString()
  @MaxLength(280)
  content: string;
}
