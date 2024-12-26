import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @MaxLength(255)
    name: string;

    @IsString()
    @MaxLength(1000)
    description: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    image?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    technologies?: string;

    @IsOptional()
    @IsUrl()
    @MaxLength(255)
    github_link?: string;

    @IsOptional()
    @IsUrl()
    @MaxLength(255)
    website_link?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    subtitle?: string;
}
