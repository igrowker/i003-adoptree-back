import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth /auth.module";
import { PasswordService } from "../auth /password.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PasswordService],
  exports: [UsersService],
})
export class UsersModule {}
