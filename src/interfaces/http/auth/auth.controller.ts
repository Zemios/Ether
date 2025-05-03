import { UserActiveInterface } from 'src/domain/users/user-active.interface';
import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/infraestructure/services/auth/auth.service';
import { RegisterDto } from 'src/application/auth/dtos/register.dto';
import { LoginDto } from 'src/application/auth/dtos/login.dto';
import { Role } from 'src/domain/users/role.enum';
import { Auth } from 'src/interfaces/decorators/auth/auth.decorator';
import { ActiveUser } from 'src/interfaces/decorators/users/active-user.decorator';
import { Response } from 'express';
import { AuthGuard } from 'src/interfaces/guards/auth.guard';

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
        if (req.user) {
            return { statusCode: 200, user: req.user };
        }
        return { statusCode: 401 };
    }

    @Get('profile')
    @Auth(Role.USER)
    profile(@ActiveUser() user: UserActiveInterface) {
        return this.authService.profile(user);
    }

    @Post('refresh')
    async refreshToken(@Req() req, @Res({ passthrough: true }) response: Response) {
        const refreshToken = req.cookies['refreshToken'];

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is required');
        }

        return await this.authService.refresh(refreshToken, response);
    }


    @UseGuards(AuthGuard)
    @Post('logout')
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('accessToken');
        response.clearCookie('refreshToken');
        return { message: 'Logout exitoso' };
    }
}
