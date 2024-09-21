import { Injectable } from "@nestjs/common";
import { Adoption, Prisma, User } from "@prisma/client"; // Importa los tipos necesarios de Prisma
import { PrismaService } from "nestjs-prisma"; // Asegúrate de que PrismaService esté bien importado

export interface UpdateUserInput {
  name?: string;
  surname?: string;
}

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  update(id: number, input: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        name: input.name,
        surname: input.surname,
      },
    });
  }

  remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
  async buyTreeUser(userId: number, treeId: number): Promise<Adoption> {
    treeId = parseInt(treeId+'')
    return this.prisma.adoption.create({
      data: {
        userId,
        treeId,
        purchaseDate: new Date(),
      },
    });
  }
}
