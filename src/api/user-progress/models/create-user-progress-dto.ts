import { IsBoolean, IsOptional } from 'class-validator';

export class CreateUserProgressDto {
    @IsOptional()
    user_id?: number;

    @IsOptional()
    course_id?: number;

    @IsOptional()
    module_id?: number;

    @IsOptional()
    lesson_id?: number;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    completed_at?: Date;
}
