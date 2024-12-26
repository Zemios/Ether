import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateModuleDto {
    @IsOptional()
    @IsNumber()
    course_id?: number;

    @IsString()
    @MaxLength(255)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @IsNumber()
    module_order: number;
}
