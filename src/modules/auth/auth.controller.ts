import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { IsPublicResource } from "./decorators";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { GoogleAuthService } from "./google-auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post("register")
  @IsPublicResource()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  @IsPublicResource()
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("google")
  @IsPublicResource()
  async googleLogin(@Body("credential") credential: string) {
    try {
      const user = await this.googleAuthService.validateUser(credential);
      const payload = { username: user.email, sub: user.id };
      return {
        token: this.jwtService.sign(payload),
        user,
      };
    } catch {
      throw new UnauthorizedException("Failed to authenticate with Google");
    }
  }
}
