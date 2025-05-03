import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { Role } from 'src/domain/users/role.enum';

export class CreateUserDto {
  @IsString()
  @MaxLength(20)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  profile_picture?: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MaxLength(255)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(280)
  about_me?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  role?: Role;
}
