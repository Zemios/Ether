import { UserService } from './user.service';
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller({})
export class UserController {
    constructor(private UserService: UserService) { }
    @Get()
    findAll() {
        return this.UserService.findAll()
    }
    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.UserService.findOne(parseInt(id))
    }

    // @Post()
    // create(@Body() createUserDto: CreateUserDto): Promise<User> {
    //   return this.usersService.create(createUserDto);
    // }

    // @Put()
    // update() {
    //     return this.UserService.update()
    // }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.UserService.remove(parseInt(id))
    }
}
