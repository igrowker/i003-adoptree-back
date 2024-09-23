import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { ERROR_KEYS } from "../../constants";
import { UsersService } from "../users/users.service";
import { AuthPayloadDTO, LoginResponse } from "./dto/auth-payload.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UpdateUserDto } from "./dto/update-profile.dto";
import { PasswordService } from "./password.service";

const DUPLICATE_ERROR_CODE = "P2002";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService
  ) {}

  async register(input: RegisterDto) {
    try {
      const createdUser = await this.usersService.create(input);

      return {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      };
    } catch (error) {
      if (DUPLICATE_ERROR_CODE) {
        throw new BadRequestException(ERROR_KEYS.AUTH_EMAIL_IN_USE);
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.passwordService.validateOrThrowException(
      email,
      password
    );

    return this.createToken(user);
  }
  

  async createToken(user: User): Promise<LoginResponse> {
    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user,
      token,
    };
  }

  async updateProfile(
    input: UpdateUserDto,
    email: string
  ): Promise<LoginResponse> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException(ERROR_KEYS.AUTH_USER_NOT_FOUND);
    }

    const updatedUser = await this.usersService.update(user.id, input);

    return this.createToken(updatedUser);
  }
}
