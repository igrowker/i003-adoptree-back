import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { UsersService } from "../users/users.service";

// Definición de la interfaz para la configuración de autenticación
interface AuthConfig {
  google: {
    clientId: string;
  };
}

@Injectable()
export class GoogleAuthService {
  private client: OAuth2Client;

  constructor(
    private usersService: UsersService,
    @Inject("AUTH_CONFIG") private authConfig: AuthConfig,
  ) {
    this.client = new OAuth2Client(this.authConfig.google.clientId);
  }

  async validateUser(credential: string) {
    try {
      // Verifica el token de Google
      const ticket = await this.client.verifyIdToken({
        idToken: credential,
        audience: this.authConfig.google.clientId,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new Error("Invalid token payload");
      }

      const email = payload.email;
      const name = payload.name;

      if (!email || !name) {
        throw new Error("Email or name not provided in Google payload");
      }

      let user;
      try {
        // Intenta encontrar al usuario por email
        user = await this.usersService.findOneByEmail(email);
      } catch (error) {
        // Si el usuario no se encuentra, capturamos el error NotFoundException
        if (error instanceof NotFoundException) {
          // Crea un nuevo usuario si no existe
          user = await this.usersService.create({
            email,
            name,
            password: "",
            role: "USER",
            googleId: payload.sub,
          });
        } else {
          // Si es otro tipo de error, lo propagamos
          throw error;
        }
      }

      // Si el usuario existe pero no tiene googleId, lo actualizamos
      if (user && !user.googleId) {
        user = await this.usersService.update(user.id, {
          googleId: payload.sub,
          email: user.email,
          name: user.name,
        });
      }

      return user;
    } catch (error) {
      console.error("Google authentication error:", error);
      throw new UnauthorizedException("Failed to authenticate with Google");
    }
  }
}
