import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }
  @Get()
  findAll() {
    return this.usersService.findAll(); // TODO: Proteger ruta (SOLO ADMIN(?) o que al menos no devuelva las contraseñas ni las id??)
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id)); // TODO: Proteger ruta (SOLO ADMIN(?)) o que no de contraseña por lo menos
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<User> {
    return this.usersService.update(parseInt(id), updateUserDto); // TODO: Proteger ruta (SOLO EL MISMO USUARIO SE PUEDE ACTUALIZAR A SI MISMO, O UN ADMIN)
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id)); // TODO: Proteger ruta (SOLO ADMIN(?) O EL PROPIO USUARIO)
  }
}
