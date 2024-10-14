import { Test, TestingModule } from "@nestjs/testing";
import { Arbol, StatusTreeEnum } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { ArbolRepository } from "../arbol.repository";

const mockPrismaService = {
  arbol: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("ArbolRepository", () => {
  let repository: ArbolRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArbolRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    repository = module.get<ArbolRepository>(ArbolRepository);
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });

  describe("create", () => {
    it("should create a new arbol", async () => {
      const input = {
        type: "Pino",
        fincaId: 1,
        userId: 1,
        statusTree: StatusTreeEnum.SEMILLA,
        images: [],
        price: ""
      };

      const result: Arbol = { id: 1, ...input, active: true };

      mockPrismaService.arbol.create.mockResolvedValue(result);

      expect(await repository.create(input)).toEqual(result);
      expect(mockPrismaService.arbol.create).toHaveBeenCalledWith({
        include: expect.any(Object),
        data: {
          finca: { connect: { id: input.fincaId } },
          statusTree: input.statusTree,
          user: { connect: { id: input.userId } },
          type: input.type,
          images: input.images,
        },
      });
    });
  });

  describe("findAll", () => {
    it("should return an array of arboles", async () => {
      const result: Arbol[] = [
        {
          id: 1,
          type: "Pino",
          statusTree: StatusTreeEnum.ARBOLITO,
          fincaId: 1,
          userId: 1,
          images:[],
          active: true,
          price: ""
        },
        {
          id: 2,
          type: "Roble",
          statusTree: StatusTreeEnum.ARBOLITO,
          fincaId: 2,
          userId: 2,
          images:[],
          active: true,
          price: ""
        },
      ];

      mockPrismaService.arbol.findMany.mockResolvedValue(result);

      expect(await repository.findAll()).toEqual(result);
      expect(mockPrismaService.arbol.findMany).toHaveBeenCalledWith({
        include: expect.any(Object),
        where: {},
      });
    });
  });

  describe("findOne", () => {
    it("should return a single arbol", async () => {
      const result: Arbol = {
        id: 1,
        type: "Pino",
        statusTree: StatusTreeEnum.ARBOLITO,
        fincaId: 1,
        userId: 1,
        images:[],
        active: true,
        price: ""
      };
      const id = 1;

      mockPrismaService.arbol.findUnique.mockResolvedValue(result);

      expect(await repository.findOne(id)).toEqual(result);
      expect(mockPrismaService.arbol.findUnique).toHaveBeenCalledWith({
        include: expect.any(Object),
        where: { id: id },
      });
    });
  });

  describe("update", () => {
    it("should update an existing arbol", async () => {
      const input = {
        type: "Roble",
        fincaId: 1,
        userId: 1,
        images:[],
        statusTree: StatusTreeEnum.ARBOLITO,
        price: ""
      };
      const result: Arbol = { id: 1, ...input, active: true };
      const id = 1;

      mockPrismaService.arbol.update.mockResolvedValue(result);

      expect(await repository.update(id, input)).toEqual(result);
      expect(mockPrismaService.arbol.update).toHaveBeenCalledWith({
			include: expect.any(Object),
			where: { id: id },
			data: {
				statusTree: input.statusTree,
				finca: { connect: { id: input.fincaId } },
				type: input.type,
				user: { connect: { id: input.userId } },
				price: input.price, // Se agrega el campo price
			},
		});
    });
  });

  describe("remove", () => {
    it("should remove an arbol", async () => {
      const result: Arbol = {
        id: 1,
        type: "Pino",
        statusTree: StatusTreeEnum.ARBOLITO,
        fincaId: 1,
        userId: 1,
        active: true,
        images:[], 
        price: ""
      };
      const id = 1;

      mockPrismaService.arbol.delete.mockResolvedValue(result);

      expect(await repository.remove(id)).toEqual(result);
      expect(mockPrismaService.arbol.delete).toHaveBeenCalledWith({
        where: { id: id },
      });
    });
  });

  describe("findStatusTreeById", () => {
    it("should return the status of the arbol", async () => {
      const result = { id: 1, statusTree: StatusTreeEnum.ARBOLITO };
      const id = 1;

      mockPrismaService.arbol.findUnique.mockResolvedValue(result);

      expect(await repository.findStatusTreeById(id)).toEqual(result);
      expect(mockPrismaService.arbol.findUnique).toHaveBeenCalledWith({
        where: { id: id },
        select: {
          id: true,
          statusTree: true,
          images: true
        },
      });
    });
  });
});
