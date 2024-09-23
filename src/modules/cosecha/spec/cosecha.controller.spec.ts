import { Test, TestingModule } from "@nestjs/testing";
import { Cosecha, EstadoDeEnvioEnum } from "@prisma/client";
import { CosechaController } from "../cosecha.controller";
import { CosechaService } from "../cosecha.service";
import { CreateCosechaDto } from "../dto/create-cosecha.dto";
import { FilterCosechaDto } from "../dto/filter-cosecha.dto";
import { UpdateCosechaDto } from "../dto/update-cosecha.dto";

describe("CosechaController", () => {
  let cosechaController: CosechaController;

  const mockCosechaService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CosechaController],
      providers: [
        {
          provide: CosechaService,
          useValue: mockCosechaService,
        },
      ],
    }).compile();

    cosechaController = module.get<CosechaController>(CosechaController);
  });

  describe("create", () => {
    it("should create a new cosecha", async () => {
      const input: CreateCosechaDto = {
        cantidad: 10,
        fechaDeEnvio: new Date(),
        estadoDeEnvio: EstadoDeEnvioEnum.DESPACHADO,
        arbolId: 1,
      };
      const result: Cosecha = { id: 1, ...input };

      mockCosechaService.create.mockResolvedValue(result);

      expect(await cosechaController.create(input)).toEqual(result);
      expect(mockCosechaService.create).toHaveBeenCalledWith(input);
    });
  });

  describe("findAll", () => {
    it("should return an array of cosechas", async () => {
      // Use the EstadoDeEnvioEnum type for filter
      const filter: FilterCosechaDto = {
        estadoDeEnvio: EstadoDeEnvioEnum.DESPACHADO,
      }; // Ensure this is an enum value
      const result: Cosecha[] = [
        {
          id: 1,
          cantidad: 10,
          fechaDeEnvio: new Date(),
          estadoDeEnvio: EstadoDeEnvioEnum.ENTREGADO, // Ensure this is an enum value
          arbolId: 1,
        },
      ];

      mockCosechaService.findAll.mockResolvedValue(result);

      expect(await cosechaController.findAll(filter)).toEqual(result);
      expect(mockCosechaService.findAll).toHaveBeenCalledWith(filter);
    });
  });

  describe("findOne", () => {
    it("should return a single cosecha", async () => {
      const id = 1;
      const result: Cosecha = {
        id,
        cantidad: 10,
        fechaDeEnvio: new Date(),
        estadoDeEnvio: EstadoDeEnvioEnum.DESPACHADO,
        arbolId: 1,
      };

      mockCosechaService.findOne.mockResolvedValue(result);

      expect(await cosechaController.findOne(id)).toEqual(result);
      expect(mockCosechaService.findOne).toHaveBeenCalledWith(id);
    });

    it("should return null if cosecha not found", async () => {
      const id = 1;

      mockCosechaService.findOne.mockResolvedValue(null);

      expect(await cosechaController.findOne(id)).toBeNull();
      expect(mockCosechaService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe("update", () => {
    it("should update a cosecha", async () => {
      const id = 1;
      const input: UpdateCosechaDto = {
        cantidad: 20,
        fechaDeEnvio: new Date(),
        estadoDeEnvio: EstadoDeEnvioEnum.DESPACHADO,
      };
      const result: Cosecha = {
        id,
        ...input,
        arbolId: 1,
      };

      mockCosechaService.update.mockResolvedValue(result);

      expect(await cosechaController.update(id, input)).toEqual(result);
      expect(mockCosechaService.update).toHaveBeenCalledWith(id, input);
    });
  });

  describe("remove", () => {
    it("should remove a cosecha", async () => {
      const id = 1;
      const result: Cosecha = {
        id,
        cantidad: 10,
        fechaDeEnvio: new Date(),
        estadoDeEnvio: "EN_PREPARACION",
        arbolId: 2,
      };

      mockCosechaService.remove.mockResolvedValue(result);

      expect(await cosechaController.remove(id)).toEqual(result);
      expect(mockCosechaService.remove).toHaveBeenCalledWith(id);
    });
  });
});
