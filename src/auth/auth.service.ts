import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }
    login() {
        return 'login'
    }

    register() {
        return 'register'
    }
}
