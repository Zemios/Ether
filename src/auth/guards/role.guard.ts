import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/need-role.decorator';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<string>(ROLES_KEY, [context.getHandler(), context.getClass()])

    if (!role) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      return false;
    }
    if (user.role === Role.ADMIN) {
      return true
    }

    return role === user.role;
  }
}
