import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRole = this.reflector.getAllAndOverride<string[]>('roles', [
        context.getClass(),
        context.getHandler(),
      ]);
      if (!requiredRole) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];

      if (!token) {
        throw new ForbiddenException('access is forbidden');
      }
      const user = this.jwtService.verify(token);

      return user.roles.some((role: { value: string }) =>
        requiredRole.includes(role.value),
      );
    } catch (error) {
      throw new ForbiddenException('access is forbidden');
    }
  }
}
