import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }
    async register({ name, email, password }: RegisterDto): Promise<any> {
        const user = await this.userService.findOneByEmail(email)

        if (user) {
            throw new BadRequestException('Email already exists');
        }

        return await this.userService.create({ name, email, password });
    }

    login() {
        return 'login'
    }
}
