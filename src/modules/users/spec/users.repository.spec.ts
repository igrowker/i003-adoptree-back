import { Test, TestingModule } from "@nestjs/testing";
import { Adoption, RoleEnum, User } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { UsersRepository } from "../users.repository"; // Ajusta la ruta según tu estructura de carpetas

const mockPrismaService = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  adoption: {
    create: jest.fn(),
  },
};

describe("UsersRepository", () => {
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe("create", () => {
    it("should create a user", async () => {
      const userData = {
        email: "test@example.com",
        name: "Test User",
        role: RoleEnum.ADMIN,
        password: "password123",
        arbolId: 1,
        googleId: "2",
        avatar: "",
      };
      const result: User = {
        id: 1,
        ...userData,
      }; // Mock user object

      mockPrismaService.user.create.mockResolvedValue(result);

      expect(await usersRepository.create(userData)).toEqual(result);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: userData,
      });
    });
  });

  describe("findOneByEmail", () => {
    it("should return a user by email", async () => {
      const email = "test@example.com";
      const result: User = {
        id: 1,
        email,
        name: "Test User",
        role: "ADMIN",
        password: "password123",
        googleId: "3",
        avatar: "",
      };

      mockPrismaService.user.findUnique.mockResolvedValue(result);

      expect(await usersRepository.findOneByEmail(email)).toEqual(result);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it("should return null if user not found", async () => {
      const email = "notfound@example.com";

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      expect(await usersRepository.findOneByEmail(email)).toBeNull();
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });

  describe("update", () => {
    it("should update a user's name", async () => {
      const id = 1;
      const input = { name: "Updated User" };
      const result: User = {
        id,
        email: "test@example.com",

        role: "ADMIN",
        password: "password123",
        googleId: "1",
        avatar: "",
        ...input,
      };

      mockPrismaService.user.update.mockResolvedValue(result);

      expect(await usersRepository.update(id, input)).toEqual(result);
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id },
        data: { name: input.name },
      });
    });
  });

  describe("remove", () => {
    it("should delete a user", async () => {
      const id = 1;
      const result: User = {
        id,
        email: "test@example.com",
        name: "Test User",

        role: "ADMIN",
        password: "password123",
        googleId: "2",
        avatar: "",
      };

      mockPrismaService.user.delete.mockResolvedValue(result);

      expect(await usersRepository.remove(id)).toEqual(result);
      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe("buyTreeUser", () => {
    it("should create an adoption record", async () => {
      const userId = 1;
      const treeId = 2;
      const shippingAddressId = 1;
      const result: Adoption = {
        userId,
        treeId,
        purchaseDate: new Date(),
        shippingAddressId,
        id: 0,
        status: "PENDING",
      };

      mockPrismaService.adoption.create.mockResolvedValue(result);

      expect(
        await usersRepository.buyTreeUser(userId, treeId, shippingAddressId),
      ).toEqual(result);
      expect(mockPrismaService.adoption.create).toHaveBeenCalledWith({
        data: {
          userId,
          treeId,
          shippingAddressId,
          purchaseDate: expect.any(Date),
        },
      });
    });
  });
});
