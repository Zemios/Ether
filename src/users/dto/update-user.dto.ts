import { IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(20)
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    profile_picture?: string;

    @IsOptional()
    @IsString()
    @MaxLength(280)
    about_me?: string;
}
