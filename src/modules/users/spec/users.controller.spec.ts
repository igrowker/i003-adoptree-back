import { Test, TestingModule } from "@nestjs/testing";
import { RoleEnum } from "@prisma/client";
import { UpdateUserDto } from "../../auth/dto/update-profile.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";

const mockUsersService = {
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  buyOneTree: jest.fn(),
};

describe("UsersController", () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  describe("createUser", () => {
    it("should create a user", async () => {
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        name: "Test User",
        role: RoleEnum.USER,
        password: "password123",
        googleId: "2",
        avatar: "",
      };

      mockUsersService.create.mockResolvedValue(createUserDto);

      expect(await usersController.createUser(createUserDto)).toEqual(
        createUserDto
      );
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      const id = 1;
      const updateUserDto: UpdateUserDto = {
        name: "Updated User",
        email: "",
      };

      mockUsersService.update.mockResolvedValue({ id, ...updateUserDto });

      expect(await usersController.updateUser(id, updateUserDto)).toEqual({
        id,
        ...updateUserDto,
      });
      expect(mockUsersService.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const id = 1;

      mockUsersService.remove.mockResolvedValue({ id });

      expect(await usersController.deleteUser(id)).toEqual({ id });
      expect(mockUsersService.remove).toHaveBeenCalledWith(id);
    });
  });

  describe("buyTree", () => {
    it("should allow a user to adopt a tree", async () => {
      const userId = 1;
      const treeId = 2;
      const shippingAddressId = 1;

      await usersController.buyTree(userId, treeId, shippingAddressId);
      expect(mockUsersService.buyOneTree).toHaveBeenCalledWith(
			userId,
			treeId,
			shippingAddressId
		);
    });
  });
});
