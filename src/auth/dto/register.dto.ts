import { Transform } from "class-transformer";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MaxLength(50)
    name: string;

    @IsEmail()
    @MaxLength(255)
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MaxLength(255)
    @MinLength(8)
    password: string;
}