import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { RoleEnum } from "@prisma/client";
import { Request } from "express";
import { ERROR_KEYS } from "../../../constants";
import COMMON_KEYS from "../../../constants/keys";
import { getReqResFromCtx } from "../../../utils";
import { AuthPayloadDTO } from "../dto/auth-payload.dto";

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicResource = this.reflector.get<boolean>(
      COMMON_KEYS.DECORATOR_IS_PUBLIC,
      context.getHandler(),
    );

    if (isPublicResource) {
      return true;
    }

    const { req: request } = getReqResFromCtx(context);

    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      const authPayload: AuthPayloadDTO = { ...payload, token };
      request["user"] = authPayload;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "jwt expired") {
          throw new UnauthorizedException(ERROR_KEYS.AUTH_EXPIRED_TOKEN);
        }
      }

      throw new UnauthorizedException();
    }

    const roles = this.reflector.get<RoleEnum[]>(
      COMMON_KEYS.DECORATOR_ROLE_CHECK,
      context.getHandler(),
    );

    if (roles && roles.length > 0) {
      const { user } = request;

      if (!user || !user.role || !roles.includes(user.role)) {
        throw new UnauthorizedException();
      }
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.slice(7);
    }
    return undefined;
  }
}
