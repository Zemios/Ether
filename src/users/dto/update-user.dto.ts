import { IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    profile_picture?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    about_me?: string;
}
