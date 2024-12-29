import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }
    async register(registerDto: RegisterDto): Promise<any> {
        const user = await this.userService.findOneByEmail(registerDto.email)

        if (user.email == registerDto.email) {
            return {
                error: 'Email already exists',
                status: 400
            }
        }
        await this.userService.create(registerDto);

    }

    login() {
        return 'login'
    }
}
