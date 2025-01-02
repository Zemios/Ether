import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { NeedRole } from './decorators/need-role.decorator';
import { RoleGuard } from './guards/role.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        console.log(registerDto)
        return this.authService.register(registerDto)
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @Get('profile')
    @NeedRole('user')
    @UseGuards(AuthGuard, RoleGuard)
    profile(@Request() req: RequestWithUser) {
        return this.authService.profile(req.user);
    }
}
