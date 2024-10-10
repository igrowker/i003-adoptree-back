import { ForbiddenException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { RoleEnum, User } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { UsersService } from "../../users/users.service";
import { PasswordService } from "../password.service";

jest.mock("bcryptjs");

describe("PasswordService", () => {
  let passwordService: PasswordService;

  const mockUserService = {
    findOneByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    passwordService = module.get<PasswordService>(PasswordService);
  });

  describe("validateOrThrowException", () => {
    it("should return user if credentials are valid", async () => {
      const email = "test@example.com";
      const password = "password";
      const user: User = {
        id: 1,
        email,
        password: await bcrypt.hash(password, 10),
        role: RoleEnum.USER,
        name: "",
 
   
        googleId: "1",
        avatar: "",
      };

      mockUserService.findOneByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await passwordService.validateOrThrowException(
        email,
        password
      );

      expect(result).toEqual(user);
      expect(mockUserService.findOneByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
    });

    it("should throw ForbiddenException if user not found", async () => {
      const email = "nonexistent@example.com";
      const password = "password";

      mockUserService.findOneByEmail.mockResolvedValue(null);

      await expect(
        passwordService.validateOrThrowException(email, password)
      ).rejects.toThrow(ForbiddenException);
    });

    it("should throw ForbiddenException if password is invalid", async () => {
      const email = "test@example.com";
      const password = "wrongpassword";
      const user: User = {
        id: 1,
        email,
        password: await bcrypt.hash("correctpassword", 10),
        role: RoleEnum.USER,
        name: "",
        googleId: "2",
        avatar: "",
      };

      mockUserService.findOneByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        passwordService.validateOrThrowException(email, password)
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe("hash", () => {
    it("should hash the password correctly", async () => {
      const password = "password";
      const hashedPassword = "hashedPassword";

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await passwordService.hash(password);

      expect(result).toEqual(hashedPassword);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    });
  });
});
