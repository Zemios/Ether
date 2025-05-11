import { IsUUID, IsString, IsNotEmpty, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserHttpDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string;
}
