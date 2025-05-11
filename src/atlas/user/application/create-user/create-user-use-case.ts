import { CreateUserDto } from "./create-user.dto";
import { PrimitiveUser, User } from "../../domain/user";
import { UserRepository } from "../../domain/user.repository";
import { Injectable } from "src/atlas/shared/dependency-injection/injectable";
// import { Injectable } from "@nestjs/common"; // Acoplamiento @nestjs/common


// @Injectable() // Si ponemos este injectable, sabemos que usamos el framework de NestJS (Por tanto tendríamos cierto acoplamiento al framework)
@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    // Garantizamos la transaccionalidad de la operación (o todo o nada)
    // Es lo que se conoce como UNIT OF WORK
    // En este caso no lo estamos haciendo a través de un gestor de transacciones
    // En el caso de trabajar con un Mongo, Postrgres, Mysql...
    // También podemos realizarlo a través de controladores (middleware - gestor de transacciones?)
    // @Transaction 
    async execute(dto: CreateUserDto): Promise<{ user: PrimitiveUser }> {

        const user = User.create(dto);

        await this.userRepository.create(user);
        // Somos agnósticos de este Gestor de Base de Datos
        // No sabemos si es Mongo, MySQL, Postgres, etc
        // Solo sabemos que tenemos un método save

        return {
            user: user.toValue(),
        }
    }
}

