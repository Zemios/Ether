import { IsOptional } from 'class-validator';

export class CreateProjectCollaboratorDto {
    @IsOptional()
    project_id?: number;

    @IsOptional()
    user_id?: number;
}
