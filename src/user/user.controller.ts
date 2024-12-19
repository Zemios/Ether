import { UserService } from './user.service';
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) { }
    @Get()
    show() {
        return this.UserService.show()
    }
    @Get('/:id')
    get(@Param('id') id: string) {
        return this.UserService.get(parseInt(id))
    }

    @Post()
    post() {
        return this.UserService.post()
    }

    @Put()
    update() {
        return this.UserService.update()
    }

    @Delete()
    delete() {
        return this.UserService.delete()
    }
}
