import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "../../application/create-user/create-user-use-case";
import { CreateUserController } from "../http-api/create-user/create-user.controller";
import { InMemoryUserRepository } from "./in-memory.user.repository";
import { UserRepository } from "../../domain/user.repository";

@Module({
    controllers: [CreateUserController],
    providers: [
        CreateUserUseCase,
        InMemoryUserRepository,
        {
            provide: UserRepository,
            useExisting: InMemoryUserRepository,
            // Debemos indicar que cuando alguien pida UserRepository
            // lo que de verdad queremos devolver es el InMemoryUserRepository
        }
    ],
    exports: [
        CreateUserUseCase // Para que el resto de módulos puedan usarlo
    ],
})

export class UserModule {

}