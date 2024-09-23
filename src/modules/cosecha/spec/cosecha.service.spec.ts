import { Test, TestingModule } from "@nestjs/testing";
import { Cosecha } from "@prisma/client";
import { CosechaRepository } from "../cosecha.repository";
import { CosechaService } from "../cosecha.service";
import { CreateCosechaDto } from "../dto/create-cosecha.dto";
import { UpdateCosechaDto } from "../dto/update-cosecha.dto";

describe("CosechaService", () => {
  let cosechaService: CosechaService;
  const mockCosechaRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CosechaService,
        {
          provide: CosechaRepository,
          useValue: mockCosechaRepository,
        },
      ],
    }).compile();

    cosechaService = module.get<CosechaService>(CosechaService);
  });

  describe("create", () => {
    it("should create a new cosecha", async () => {
      const input: CreateCosechaDto = {
        cantidad: 10,
        fechaDeEnvio: new Date(),
        estadoDeEnvio: "DESPACHADO", // Ensure this matches your enum
        arbolId: 1,
      };
      const result: Cosecha = { id: 1, ...input };

      mockCosechaRepository.create.mockResolvedValue(result);

      expect(await cosechaService.create(input)).toEqual(result);
      expect(mockCosechaRepository.create).toHaveBeenCalledWith(input);
    });
  });

  describe("findAll", () => {
    it("should return an array of cosechas", async () => {
      const filter = { arbolId: 1 }; // Adjust as needed for your FilterCosechaDto
      const result: Cosecha[] = [
        {
          id: 1,
          cantidad: 10,
          fechaDeEnvio: new Date(),
          estadoDeEnvio: "ENTREGADO", // Ensure this matches your enum
          arbolId: 1,
        },
      ];

      mockCosechaRepository.findAll.mockResolvedValue(result);

      expect(await cosechaService.findAll(filter)).toEqual(result);
      expect(mockCosechaRepository.findAll).toHaveBeenCalledWith({
        arbolId: 1,
      });
    });
  });

  describe("findOne", () => {
    it("should return a single cosecha", async () => {
      const id = 1;
      const result: Cosecha = {
        id,
        cantidad: 10,
        fechaDeEnvio: new Date(),
        estadoDeEnvio: "DESPACHADO", // Ensure this matches your enum
        arbolId: 1,
      };

      mockCosechaRepository.findOne.mockResolvedValue(result);

      expect(await cosechaService.findOne(id)).toEqual(result);
      expect(mockCosechaRepository.findOne).toHaveBeenCalledWith(id);
    });

    it("should return null if cosecha not found", async () => {
      const id = 1;

      mockCosechaRepository.findOne.mockResolvedValue(null);

      expect(await cosechaService.findOne(id)).toBeNull();
      expect(mockCosechaRepository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe("update", () => {
    it("should update a cosecha", async () => {
      const id = 1;
      const input: UpdateCosechaDto = {
        cantidad: 20,
        fechaDeEnvio: new Date(),
        estadoDeEnvio: "EN_CAMINO", // Ensure this matches your enum
      };
      const result: Cosecha = {
        id,
        ...input,
        arbolId: 1,
      };

      mockCosechaRepository.update.mockResolvedValue(result);

      expect(await cosechaService.update(id, input)).toEqual(result);
      expect(mockCosechaRepository.update).toHaveBeenCalledWith(id, input);
    });
  });

  describe("remove", () => {
    it("should remove a cosecha", async () => {
      const id = 1;
      const result: Cosecha = {
        id,
        cantidad: 10,
        fechaDeEnvio: new Date(),
        estadoDeEnvio: "EN_PREPARACION", // Ensure this matches your enum
        arbolId: 2,
      };

      mockCosechaRepository.remove.mockResolvedValue(result);

      expect(await cosechaService.remove(id)).toEqual(result);
      expect(mockCosechaRepository.remove).toHaveBeenCalledWith(id);
    });
  });
});
