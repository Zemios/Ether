import { CreateUserDto } from './models/create-user.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller({})
export class UserController {
    constructor(private userService: UserService) { }
    @Get()
    findAll() {
        return this.userService.findAll()
    }
    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id))
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    // @Put()
    // update() {
    //     return this.UserService.update()
    // }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.userService.remove(parseInt(id))
    }
}
