import { Controller, Body} from '@nestjs/common';
import { CreateUserHttpDto } from './create-user.http-dto';
import { CreateUserUseCase } from 'src/atlas/user/application/create-user/create-user-use-case';
import { PrimitiveUser } from 'src/atlas/user/domain/user';

@Controller('users')
export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}
    // Validamos a traves la capa de HTTP DTO
    async run(@Body() CreateUserHttpDto: CreateUserHttpDto): Promise<{ user: PrimitiveUser; }> { // Creamos el dto de la capa de dominio
        return await this.createUserUseCase.execute({ // Llamamos a la capa de aplicación
            id: CreateUserHttpDto.id,
            name: CreateUserHttpDto.name,
            email: CreateUserHttpDto.email,
            password: CreateUserHttpDto.password,
        })
    }
}
