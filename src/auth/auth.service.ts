import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { hash, compare } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }
    async register({ name, email, password }: RegisterDto): Promise<any> {
        const user = await this.userService.findOneByEmail(email)

        if (user) {
            throw new BadRequestException('Email already exists');
        }

        return await this.userService.create({ name, email, password: await hash(password, 10) });
    }

    async login({ email, password }: LoginDto) {
        const user = await this.userService.findOneByEmail(email)

        if (user) {
            if (await compare(password, user.password)) {
                const payload = { email: user.email, role: user.role };
                const token = await this.jwtService.signAsync(payload)
                return { token }
            }
        }

        throw new UnauthorizedException('Invalid credentials');
    }

    async profile({ email, role }: { email: string; role: string }) {
        return await this.userService.findOneByEmail(email)
    }
}
