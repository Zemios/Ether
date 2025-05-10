import { CreateUserDTO } from "./create-user.dto";
import { PrimitiveUser, User } from "../../domain/user";
import { UserRepository } from "../../domain/user.repository";
import { Transaction } from "typeorm";

export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    // Garantizamos la transaccionalidad de la operación (o todo o nada)
    // que se puede hacer
    // En el caso de trabajar con un Mongo, Postrgres, Mysql...
    // También podemos realizarlo a través de controladores (middleware - gestor de transacciones?)
    // @Transaction 
    async execute(dto: CreateUserDTO): Promise<{ user: PrimitiveUser }> {

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

