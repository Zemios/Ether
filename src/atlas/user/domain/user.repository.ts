import { User } from "./user";

export abstract class UserRepository {

    abstract create(user: User): Promise<void>;

    abstract getById(id: number): Promise<User> | null;

}
// Creamos clases abstractas con los diferentes métodos a usar
// Porque en este caso trabajamos con NestJS y queremos
// inyectar las dependencias (Todo esto es recomendable por guías oficiales)
// Esto es lo que conocemos como puerto dentro de la arquitectura hexagonal

// Otra cosa que nos podemos encontrar en la propia capa de dominio
// Serían todas las excepciones que pueden ocurrir alrededor de esta entidad