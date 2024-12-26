import { IsOptional, IsString } from 'class-validator';

export class CreateUserProjectDto {
    @IsOptional()
    user_id?: number;

    @IsOptional()
    project_id?: number;

    @IsOptional()
    @IsString()
    contribution?: string;
}
