import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
import { GoogleAuthService } from "../google-auth.service";

describe("AuthController", () => {
  let authController: AuthController;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  const mockGoogleAuthService = {
    validateUser: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: GoogleAuthService,
          useValue: mockGoogleAuthService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const registerDto: RegisterDto = {
        email: "test@example.com",
        password: "password",
        name: "",
        role: "ADMIN",
        avatar: "",
      };
      const result = { id: 1, ...registerDto };

      mockAuthService.register.mockResolvedValue(result);

      expect(await authController.register(registerDto)).toEqual(result);
      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe("login", () => {
    it("should login a user", async () => {
      const loginDto: LoginDto = {
        email: "test@example.com",
        password: "password",
      };
      const result = { token: "token" };

      mockAuthService.login.mockResolvedValue(result);

      expect(await authController.login(loginDto)).toEqual(result);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe("googleLogin", () => {
    it("should return a token and user on successful google login", async () => {
      const credential = "valid-credential";
      const user = { id: 1, email: "test@example.com" };
      const payload = { username: user.email, sub: user.id };
      const token = "jwt-token";

      mockGoogleAuthService.validateUser.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue(token);

      const result = await authController.googleLogin(credential);

      expect(result).toEqual({ token, user });
      expect(mockGoogleAuthService.validateUser).toHaveBeenCalledWith(
        credential,
      );
      expect(mockJwtService.sign).toHaveBeenCalledWith(payload);
    });

    it("should throw UnauthorizedException on google login failure", async () => {
      const credential = "invalid-credential";

      mockGoogleAuthService.validateUser.mockRejectedValue(
        new Error("Validation failed"),
      );

      await expect(authController.googleLogin(credential)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
