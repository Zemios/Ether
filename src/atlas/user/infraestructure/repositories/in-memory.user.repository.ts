import { PrimitiveUser, User } from "../../domain/user";
import { UserRepository } from "../../domain/user.repository";


export class InMemoryUserRepository extends UserRepository {

    private users: PrimitiveUser[] = [];

    async create(user: User): Promise<void> {
        this.users.push(user.toValue());
    }


    async getById(id: number): Promise<User | null> {
        const user = this.users.find(user => user.id === id);
        return user ? new User(user) : null;
    }

}