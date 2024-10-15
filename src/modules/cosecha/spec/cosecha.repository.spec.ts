// src/modules/cosecha/spec/cosecha.repository.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { EstadoDeEnvioEnum } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { CosechaRepository } from "../cosecha.repository";

describe("CosechaRepository", () => {
  let cosechaRepository: CosechaRepository;

  const mockPrismaService = {
    cosecha: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CosechaRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    cosechaRepository = module.get<CosechaRepository>(CosechaRepository);
  });

  describe("create", () => {
    it("should create a new cosecha", async () => {
      const input = {
        arbolId: 1,
        cantidad: 10,
        fechaDeEnvio: new Date(),
        estadoDeEnvio: EstadoDeEnvioEnum.DESPACHADO,
      };

      const result = {
        id: 1,
        ...input,
        arbol: {
          id: input.arbolId,
          statusTree: "ARBOLITO",
          type: "Apple",
          price: "",
          finca: {
            id: 1,
            name: "Finca 1",
            practicesSustainable: "Sostenible",
            ubication: "Location A",
            productor: {},
          },
        },
      };

      mockPrismaService.cosecha.create.mockResolvedValue(result);

      const createdCosecha = await cosechaRepository.create(input);
      expect(createdCosecha).toEqual(result);
      expect(mockPrismaService.cosecha.create).toHaveBeenCalledWith({
        data: {
          cantidad: input.cantidad,
          fechaDeEnvio: input.fechaDeEnvio,
          estadoDeEnvio: input.estadoDeEnvio,
          arbol: { connect: { id: input.arbolId } }, // Solo aquí conectamos el arbol
        },
        include: cosechaRepository["commonIncludes"],
      });
    });
  });

  describe("findAll", () => {
    it("should return an array of cosechas", async () => {
      const filter = { arbolId: 1 };
      const result = [
        {
          id: 1,
          arbolId: 1,
          cantidad: 10,
          fechaDeEnvio: new Date(),
          estadoDeEnvio: EstadoDeEnvioEnum.ENTREGADO,
          arbol: {
            id: 1,
            statusTree: "ARBOLITO",
            type: "Apple",
            price: "",
            finca: {
              id: 1,
              name: "Finca 1",
              practicesSustainable: "Sostenible",
              ubication: "Location A",
              productor: {},
            },
          },
        },
      ];

      mockPrismaService.cosecha.findMany.mockResolvedValue(result);

      const cosechas = await cosechaRepository.findAll(filter);
      expect(cosechas).toEqual(result);
      expect(mockPrismaService.cosecha.findMany).toHaveBeenCalledWith({
        include: cosechaRepository["commonIncludes"],
        where: { arbolId: filter.arbolId },
      });
    });
  });

  describe("findOne", () => {
    it("should return a single cosecha", async () => {
      const id = 1;
      const result = {
        id,
        arbolId: 1,
        cantidad: 10,
        fechaDeEnvio: new Date(),
        estadoDeEnvio: EstadoDeEnvioEnum.DESPACHADO,
        arbol: {
          id: 1,
          statusTree: "ARBOL_JOVEN",
          type: "Apple",
          price: "",
          finca: {
            id: 1,
            name: "Finca 1",
            practicesSustainable: "Sostenible",
            ubication: "Location A",
            productor: {},
          },
        },
      };

      mockPrismaService.cosecha.findUnique.mockResolvedValue(result);

      const cosecha = await cosechaRepository.findOne(id);
      expect(cosecha).toEqual(result);
      expect(mockPrismaService.cosecha.findUnique).toHaveBeenCalledWith({
        where: { id },
        include: cosechaRepository["commonIncludes"],
      });
    });

    it("should return null if cosecha not found", async () => {
      const id = 1;

      mockPrismaService.cosecha.findUnique.mockResolvedValue(null);

      const cosecha = await cosechaRepository.findOne(id);
      expect(cosecha).toBeNull();
      expect(mockPrismaService.cosecha.findUnique).toHaveBeenCalledWith({
        where: { id },
        include: cosechaRepository["commonIncludes"],
      });
    });
  });

  describe("update", () => {
    it("should update a cosecha", async () => {
      const id = 1;
      const input = {
        cantidad: 20,
        fechaDeEnvio: new Date(),
        estadoDeEnvio: EstadoDeEnvioEnum.EN_CAMINO,
      };

      const result = {
        id,
        arbolId: 1,
        ...input,
        arbol: {
          id: 1,
          statusTree: "ARBOL_JOVEN",
          type: "Apple",
          price: "",
          finca: {
            id: 1,
            name: "Finca 1",
            practicesSustainable: "Sostenible",
            ubication: "Location A",
            productor: {},
          },
        },
      };

      mockPrismaService.cosecha.update.mockResolvedValue(result);

      const updatedCosecha = await cosechaRepository.update(id, input);
      expect(updatedCosecha).toEqual(result);
      expect(mockPrismaService.cosecha.update).toHaveBeenCalledWith({
        where: { id },
        data: input,
        include: cosechaRepository["commonIncludes"],
      });
    });
  });

  describe("remove", () => {
    it("should remove a cosecha", async () => {
      const id = 1;
      const result = {
        id,
        arbolId: 1,
        cantidad: 10,
        fechaDeEnvio: new Date(),
        estadoDeEnvio: EstadoDeEnvioEnum.EN_PREPARACION,
        arbol: {
          id: 1,
          statusTree: "ARBOL_JOVEN",
          type: "Apple",
          price: "",
          finca: {
            id: 1,
            name: "Finca 1",
            practicesSustainable: "Sostenible",
            ubication: "Location A",
            productor: {},
          },
        },
      };

      mockPrismaService.cosecha.delete.mockResolvedValue(result);

      const removedCosecha = await cosechaRepository.remove(id);
      expect(removedCosecha).toEqual(result);
      expect(mockPrismaService.cosecha.delete).toHaveBeenCalledWith({
        where: { id },
        include: cosechaRepository["commonIncludes"],
      });
    });
  });
});
