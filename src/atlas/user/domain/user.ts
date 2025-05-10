import { v4 as uuidv4 } from 'uuid';

export interface PrimitiveUser {
    id: number;
    name: string;
    email: string;
    registered_at: Date;
    password: string;
    about_me: string;
    role: string;
}

export class User {
    
    constructor(private attributes: PrimitiveUser) {}

    static create(createUser: {
        id: number;
        name: string;
        email: string;
        password: string;
    }): User {
        return new User({
            id: uuidv4(),
            name: '',
            email: createUser.email,
            registered_at: new Date(),
            password: createUser.password,
            about_me: '',
            role: 'user',
        });
    }

    toValue(): PrimitiveUser {
        // Cuando el objeto vaya viajando entre capa, se va a ir transformando
        // y al final se va a convertir en un objeto plano
        // Esto es a gusto de cada uno
        return {
            id: this.attributes.id,
            name: this.attributes.name,
            email: this.attributes.email,
            registered_at: this.attributes.registered_at,
            password: this.attributes.password,
            about_me: this.attributes.about_me,
            role: this.attributes.role,
        };
        
    }
    
}