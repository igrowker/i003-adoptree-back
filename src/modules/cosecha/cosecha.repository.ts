import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

export type CosechaRepo = Prisma.CosechaGetPayload<{}>;

interface CosechaCreateRepoInput {}

interface CosechaUpdateRepoInput {}

interface CosechaFilterRepoInput {}

@Injectable()
export class CosechaRepository {
  constructor(private readonly prisma: PrismaService) {}

  create() {}

  findAll() {}

  findOne() {}

  update() {}

  remove() {}
}
