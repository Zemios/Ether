import { UserActiveInterface } from './../common/interfaces/user-active.interface';
import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Response } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')

    async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) response: Response) {
        return await this.authService.register(registerDto, response);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
        return await this.authService.login(loginDto, response);
    }

    @UseGuards(AuthGuard)
    @Get('check')
    checkAuth(@Req() req) {
        return { isAuthenticated: true, user: req.user };
    }

    @Get('profile')
    @Auth(Role.USER)
    profile(@ActiveUser() user: UserActiveInterface) {
        return this.authService.profile(user);
    }
    @Post('refresh')
    async refreshToken(@Body('refreshToken') refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is required');
        }

        return await this.authService.refresh(refreshToken);
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('authToken');
        return { message: 'Logout exitoso' };
    }
}
