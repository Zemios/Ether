import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNewsDto {
    @IsString()
    @MaxLength(255)
    title: string;

    @IsString()
    @MaxLength(2000)
    content: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    category?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    image?: string;

    @IsOptional()
    author_id?: number;
}
