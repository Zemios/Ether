import { UsersService } from './users.service';
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService) { }
    @Get()
    show() {
        return this.UsersService.show()
    }
    @Get('/:id')
    get(@Param('id') id: string) {
        return this.UsersService.get(parseInt(id))
    }

    @Post()
    post() {
        return this.UsersService.post()
    }

    @Put()
    update() {
        return this.UsersService.update()
    }

    @Delete()
    delete() {
        return this.UsersService.delete()
    }
}
