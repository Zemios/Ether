import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const accessToken = this.extractTokenFromCookie(request, 'accessToken') || this.extractTokenFromHeader(request, 'accessToken');
    const refreshToken = this.extractTokenFromCookie(request, 'refreshToken') || this.extractTokenFromHeader(request, 'refreshToken');

    if (!accessToken && !refreshToken) {
      throw new UnauthorizedException('No tokens found');
    }

    try {
      const payload = accessToken ? await this.verifyToken(accessToken, 'accessToken') : null;

      if (!payload && refreshToken) {
        await this.verifyToken(refreshToken, 'refreshToken');
      }

      if (payload) {
        request['user'] = payload;
      }

    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request, tokenType: string): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' && tokenType === 'accessToken' ? token : undefined;
  }

  private extractTokenFromCookie(request: Request, tokenType: string): string | undefined {
    return request.cookies[tokenType];
  }

  private async verifyToken(token: string, tokenType: string): Promise<any> {
    const secretKey = tokenType === 'accessToken' ? process.env.SECRET_KEY : process.env.REFRESH_SECRET_KEY;

    try {
      return await this.jwtService.verifyAsync(token, { secret: secretKey });
    } catch (error) {
      throw new UnauthorizedException(`Invalid ${tokenType}`);
    }
  }
}
