import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { UpdateUserDto } from "../auth/dto/update-profile.dto";
import { PasswordService } from "../auth/password.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => PasswordService))
    private readonly passwordService: PasswordService,
    private readonly usersRepo: UsersRepository
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepo.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(input: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hash(input.password);

    return this.usersRepo.create({
      name: input.name,
      surname: input.surname,
      email: input.email,
      password: hashedPassword,
      direccionEnvio: input.direccionEnvio,
      role: input.role,
    });
  }

  async update(id: number, input: UpdateUserDto): Promise<User> {
    const existingUser = await this.usersRepo.update(id, input);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.usersRepo.update(id, input);
  }

  async remove(id: number): Promise<void> {
    const existingUser = await this.usersRepo.remove(id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.usersRepo.remove(id);
  }
  async buyOneTree(userId: number, treeId: number): Promise<void> {
    await this.usersRepo.buyTreeUser(userId, treeId);
  }
}
