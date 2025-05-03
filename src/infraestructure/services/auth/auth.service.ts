import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from 'src/application/auth/dtos/register.dto';
import { hash, compare } from 'bcryptjs';
import { LoginDto } from 'src/application/auth/dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    private async generateTokens(user: any) {
        const payload = { id: user.id, email: user.email, role: user.role };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: '24h',
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.REFRESH_SECRET_KEY,
            expiresIn: '30d',
        });

        return { accessToken, refreshToken };
    }

    async register({ name, email, password }: RegisterDto, res: Response): Promise<void> {
        const user = await this.userService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('Email already exists');
        }

        await this.userService.create({ name, email, password: await hash(password, 10) });
        return this.login({ email, password }, res);
    }

    async login({ email, password }: LoginDto, res: Response): Promise<void> {
        const user = await this.userService.findOneByEmailByPassword(email);

        if (user && await compare(password, user.password)) {
            const { accessToken, refreshToken } = await this.generateTokens(user);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            res.json({ message: 'Logged in successfully' });
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async refresh(refreshToken: string, res: Response): Promise<{ accessToken: string }> {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.REFRESH_SECRET_KEY,
            });

            const newAccessToken = await this.jwtService.signAsync(
                { id: payload.id, email: payload.email, role: payload.role },
                { secret: process.env.SECRET_KEY, expiresIn: '24h' },
            );

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
            });

            return { accessToken: newAccessToken };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async refreshTokens(refreshToken: string, res: Response): Promise<void> {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.REFRESH_SECRET_KEY,
            });

            const user = await this.userService.findOneByEmail(payload.email);
            if (!user) throw new UnauthorizedException('User not found');

            const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(user);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000,
            });

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            res.json({ message: 'Tokens refreshed successfully' });
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
    async profile({ email }: { email: string }) {
        return await this.userService.findOneByEmail(email);
    }
}
