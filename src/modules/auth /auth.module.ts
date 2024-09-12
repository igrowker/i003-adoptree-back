import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PasswordService } from "./password.service";
import { GoogleStrategy } from "./strategies";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, PasswordService],
  exports: [AuthService],
})
export class AuthModule {}
