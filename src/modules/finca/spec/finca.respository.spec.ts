import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "nestjs-prisma";
import { FincaRepository } from "../finca.repository";

describe("FincaRepository", () => {
  let fincaRepository: FincaRepository;

  const mockPrismaService = {
    finca: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    arbol: {
      deleteMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FincaRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    fincaRepository = module.get<FincaRepository>(FincaRepository);
  });

  describe("createFinca", () => {
    it("should create a new finca", async () => {
      const input = {
        name: "Finca 1",
        ubication: "Location A",
        practicesSustainable: "",
        productor: ""
      };

      const result = {
        id: 1,
        ...input,
        arbol: [],
      };

      mockPrismaService.finca.create.mockResolvedValue(result);

      expect(await fincaRepository.createFinca(input)).toEqual(result);
      expect(mockPrismaService.finca.create).toHaveBeenCalledWith({
        include: fincaRepository.commonIncludes,
        data: input,
      });
    });
  });

  describe("updateFinca", () => {
    it("should update an existing finca", async () => {
      const id = 1;
      const input = {
        name: "Updated Finca",
        ubication: "Updated Location",
        practicesSustainable: "",
        productor: ""
      };

      const result = {
        id,
        ...input,
        arbol: [],
      };

      mockPrismaService.finca.update.mockResolvedValue(result);

      expect(await fincaRepository.updateFinca(id, input)).toEqual(result);
      expect(mockPrismaService.finca.update).toHaveBeenCalledWith({
        include: fincaRepository.commonIncludes,
        where: { id },
        data: input,
      });
    });
  });

  describe("deleteFinca", () => {
    it("should delete an existing finca and its associated arboles", async () => {
      const id = 1;

      const result = {
        id,
        name: "Finca 1",
        ubication: "Location A",
        practicesSustainable: "",
        arbol: [],
      };

      mockPrismaService.arbol.deleteMany.mockResolvedValue({});
      mockPrismaService.finca.delete.mockResolvedValue(result);

      expect(await fincaRepository.deleteFinca(id)).toEqual(result);
      expect(mockPrismaService.arbol.deleteMany).toHaveBeenCalledWith({
        where: { fincaId: id },
      });
      expect(mockPrismaService.finca.delete).toHaveBeenCalledWith({
        include: fincaRepository.commonIncludes,
        where: { id },
      });
    });
  });

  describe("findAllFincas", () => {
    it("should return an array of fincas", async () => {
      const filter = { id: 1 };
      const result = [
        {
          id: 1,
          name: "Finca 1",
          ubication: "Location A",
          practicesSustainable: "",
          arbol: [],
        },
      ];

      mockPrismaService.finca.findMany.mockResolvedValue(result);

      expect(await fincaRepository.findAllFincas(filter)).toEqual(result);
      expect(mockPrismaService.finca.findMany).toHaveBeenCalledWith({
        include: fincaRepository.commonIncludes,
        where: { id: filter.id },
      });
    });
  });

  describe("findFincaById", () => {
    it("should return a single finca", async () => {
      const id = 1;
      const result = {
        id,
        name: "Finca 1",
        ubication: "Location A",
        practicesSustainable: "",
        arbol: [],
      };

      mockPrismaService.finca.findUnique.mockResolvedValue(result);

      expect(await fincaRepository.findFincaById(id)).toEqual(result);
      expect(mockPrismaService.finca.findUnique).toHaveBeenCalledWith({
        include: fincaRepository.commonIncludes,
        where: { id },
      });
    });

    it("should return null if finca not found", async () => {
      const id = 1;

      mockPrismaService.finca.findUnique.mockResolvedValue(null);

      expect(await fincaRepository.findFincaById(id)).toBeNull();
      expect(mockPrismaService.finca.findUnique).toHaveBeenCalledWith({
        include: fincaRepository.commonIncludes,
        where: { id },
      });
    });
  });
});
