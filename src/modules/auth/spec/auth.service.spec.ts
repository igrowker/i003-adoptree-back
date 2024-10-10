import { BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { ERROR_KEYS } from "../../../constants";
import { UsersService } from "../../users/users.service";
import { AuthService } from "../auth.service";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
import { UpdateUserDto } from "../dto/update-profile.dto";
import { PasswordService } from "../password.service";

describe("AuthService", () => {
  let authService: AuthService;
  const DUPLICATE_ERROR_CODE = "P2002";

  const mockUsersService = {
    create: jest.fn(),
    findOneByEmail: jest.fn(),
    update: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockPasswordService = {
    validateOrThrowException: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: PasswordService,
          useValue: mockPasswordService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const registerDto: RegisterDto = {
        email: "test@example.com",
        password: "password",
        name: "Test User",
        role: "ADMIN",
        avatar: "",
      };
      const createdUser = { id: 1, ...registerDto };

      mockUsersService.create.mockResolvedValue(createdUser);

      const result = await authService.register(registerDto);

      expect(result).toEqual({
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      });
      expect(mockUsersService.create).toHaveBeenCalledWith(registerDto);
    });

    it("should throw BadRequestException if email is in use", async () => {
      const registerDto: RegisterDto = {
        email: "test@example.com",
        password: "password",
        name: "Test User",
        role: "ADMIN",
        avatar: "",
      };

      mockUsersService.create.mockRejectedValue(
        new Error(DUPLICATE_ERROR_CODE)
      );

      await expect(authService.register(registerDto)).rejects.toThrow(
        BadRequestException
      );
      await expect(authService.register(registerDto)).rejects.toThrow(
        ERROR_KEYS.AUTH_EMAIL_IN_USE
      );
    });
  });

  describe("login", () => {
    it("should return a token and user info on successful login", async () => {
      const loginDto: LoginDto = {
        email: "test@example.com",
        password: "password",
      };
      const user = { id: 1, email: "test@example.com", role: "user" };

      mockPasswordService.validateOrThrowException.mockResolvedValue(user);
      mockJwtService.signAsync.mockResolvedValue("token");

      const result = await authService.login(loginDto);

      expect(result).toEqual({ user, token: "token" });
      expect(mockPasswordService.validateOrThrowException).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password
      );
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    });
  });

  describe("updateProfile", () => {
    it("should update user profile and return a new token", async () => {
      const updateDto: UpdateUserDto = {
        name: "Updated User",
        email: "",
      };
      const email = "test@example.com";
      const user = { id: 1, email: email, role: "user" };

      mockUsersService.findOneByEmail.mockResolvedValue(user);
      mockUsersService.update.mockResolvedValue({ ...user, ...updateDto });
      mockJwtService.signAsync.mockResolvedValue("new-token");

      const result = await authService.updateProfile(updateDto, email);

      expect(result).toEqual({
        user: { ...user, ...updateDto },
        token: "new-token",
      });
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(email);
      expect(mockUsersService.update).toHaveBeenCalledWith(user.id, updateDto);
    });

    it("should throw BadRequestException if user not found", async () => {
      const updateDto: UpdateUserDto = {
        name: "Updated User",
        email: "",
      };
      const email = "nonexistent@example.com";

      mockUsersService.findOneByEmail.mockResolvedValue(null);

      await expect(authService.updateProfile(updateDto, email)).rejects.toThrow(
        BadRequestException
      );
      await expect(authService.updateProfile(updateDto, email)).rejects.toThrow(
        ERROR_KEYS.AUTH_USER_NOT_FOUND
      );
    });
  });
});
