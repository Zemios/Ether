import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core'; // Importa RouterModule

@Module({
  controllers: [ApiController],
  imports: [
    // Define las rutas solo para los módulos dentro de `api`
    RouterModule.register([
      {
        path: 'api', // Prefijo 'api' solo para los módulos dentro de esta carpeta
        module: ApiModule,
        children: [
          {
            path: 'user', // Prefijo 'user' dentro de 'api'
            module: UserModule,
          },
          // Agrega más módulos aquí, si es necesario (like, comment, etc.)
        ],
      },
    ]),
    UserModule, // Importa los módulos de `user` y demás submódulos aquí
  ],
})
export class ApiModule { }
