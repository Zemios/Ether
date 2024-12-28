import { IsOptional, IsNumber } from 'class-validator';

export class CreateUserLikeDto {
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsOptional()
  @IsNumber()
  post_id?: number;

  @IsOptional()
  @IsNumber()
  news_id?: number;
}
