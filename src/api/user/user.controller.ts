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
    // post() {
    //     return this.UserService.post()
    // }

    // @Put()
    // update() {
    //     return this.UserService.update()
    // }

    @Delete()
    remove(@Param('id') id: string) {
        return this.UserService.remove(parseInt(id))
    }
}
