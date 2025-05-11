import { Injectable as NextJsInjectable } from '@nestjs/common'

export function Injectable() {
    return NextJsInjectable();
}

// En TypeScript las interfaces se eliminan al compilar, así que un contenedor de inyección de dependencias como Inversify no puede “verlas” en tiempo de ejecución y te obliga a usar @Inject('SomeInterface') con un token de cadena en cada constructor—lo cual ensucia tu dominio con detalles de infraestructura.

// La solución que propone Albert es usar clases abstractas en lugar de interfaces:

// La inyección se hace simplemente por tipo (la clase abstracta sigue existiendo en tiempo de ejecución), sin poner decoradores @Inject ni tokens de string en el dominio.

// Los tests se benefician: Jest puede crear mocks de clases abstractas automáticamente con sus helpers.

// Es un trade-off (“precio”): le añades un poco de complejidad al modelo (tener clases abstractas) para ganar desacoplamiento y mejor testeo, sin amarrarte a Inversify ni a NestJS en tu lógica de negocio.