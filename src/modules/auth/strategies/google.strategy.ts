import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { RoleEnum } from "@prisma/client";
import { Request } from "express";
import { Profile, Strategy } from "passport-google-oauth20";
import { UsersService } from "../../users/users.service";
import { AuthConfig } from "../auth.config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(
    @Inject(AuthConfig.KEY)
    private authConfig: ConfigType<typeof AuthConfig>,
    private readonly usersService: UsersService // Inyecta tu servicio de usuarios
  ) {
    super({
      clientID: authConfig.google.clientId,
      clientSecret: authConfig.google.clientSecret,
      scope: ["email", "profile"],
      passReqToCallback: true,
      callbackURL: authConfig.google.callbackUrl,
    });
  }

  async authenticate(req: Request) {
    const sourceQueryParameter = req.query.source;

    const isCallback = !req.route.path.includes("/auth/login/google");

    if (!isCallback) {
      return super.authenticate(req, {
        state: JSON.stringify({ source: sourceQueryParameter }),
      });
    }
    return super.authenticate(req);
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile
  ) {
    const {
      name,
      emails,
      //  photos
    } = profile;

    // const stateData = req.query.state
    //   ? JSON.parse(req.query.state.toString())
    //   : {};

    try {
      let user = await this.usersService.findOneByEmail(emails[0].value);

      if (!user) {
        user = await this.usersService.create({
          name: name.givenName,
          surname: name.familyName,
          email: emails[0].value,
          password: "",
          direccionEnvio: "",
          role: RoleEnum.USER,
        });
      }

      // Retorna el usuario que ha sido encontrado o creado
      return user;
    } catch (error) {
      this.logger.error("Google authentication error", error);
      throw new Error("Authentication failed");
    }
  }
}
