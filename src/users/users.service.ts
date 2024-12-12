import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    show() {
        /* Conectar base de datos */
        return 'Hola, devuelvo todos los usuarios mira: ${data} <-- aun no hay data'
    }
    get(id) {
        return `Id: ${id}`
    }
    post() { }
    update() { }
    delete() { }
}
