import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IsPublicResource } from "./decorators";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
