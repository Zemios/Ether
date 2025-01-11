import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsOptional()
  post_id?: number;

  @IsOptional()
  user_id?: number;

  @IsString()
  @MaxLength(500)
  content: string;
}
