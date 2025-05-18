export class UserNotFoundException extends Error {
    constructor(public readonly id: string) {
        // Recibimos el identificador para poder devolverlo como mensaje de error
        // y así saber qué usuario no se encontró
        super(`User with id ${id} not found`);
    }
}