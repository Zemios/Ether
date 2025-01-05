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
        const user = await this.userService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('Email already exists');
        }

        await this.userService.create({ name, email, password: await hash(password, 10) });
        return this.login({ email, password });
    }

    async login({ email, password }: LoginDto): Promise<{ token: string }> {
        const user = await this.userService.findOneByEmailByPassword(email);

        if (user && await compare(password, user.password)) {
            const payload = { id: user.id, email: user.email, role: user.role };

            const token = await this.jwtService.signAsync(payload);

            return { token };
        }

        throw new UnauthorizedException('Invalid credentials');
    }

    async profile({ email }: { email: string }) {
        return await this.userService.findOneByEmail(email);
    }
}
