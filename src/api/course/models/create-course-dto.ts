import { IsArray, IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsJSON()
    content: any;

    @IsArray()
    modules: number[]; // Array de IDs de módulos, se puede modificar según lo necesario
}
