import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core'; // Importa RouterModule


@Module({
  controllers: [ApiController],
  imports: [
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
        children: [
          {
            path: 'user',
            module: UserModule,
          },

        ],
      },
    ]),
    UserModule,

  ],
})
export class ApiModule { }
