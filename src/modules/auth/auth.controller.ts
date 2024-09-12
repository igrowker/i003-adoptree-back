import { Body, Controller, Inject, Injectable, Post } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AppConfig } from "../app/app.config";
import { AuthService } from "./auth.service";
import { IsPublicResource } from "./decorators";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>
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
}
