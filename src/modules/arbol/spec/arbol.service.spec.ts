import { Test, TestingModule } from "@nestjs/testing";
import { Arbol } from "@prisma/client";
import { ArbolRepository } from "../arbol.repository";
import { ArbolService } from "../arbol.service";
import { CreateArbolDto } from "../dto/create-arbol.dto";
import { UpdateArbolDto } from "../dto/update-arbol";

describe("ArbolService", () => {
  let service: ArbolService;

  const mockArbolRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findStatusTreeById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArbolService,
        {
          provide: ArbolRepository,
          useValue: mockArbolRepository,
        },
      ],
    }).compile();

    service = module.get<ArbolService>(ArbolService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createArbol", () => {
    it("should create a new arbol", async () => {
      const createArbolDto: CreateArbolDto = {
        fincaId: 1,
        images: [],
        statusTree: "SEMILLA",
        type: "ArbolTipo",
        price: "",
        userId: 1,
      };

      const result: Arbol = {
        id: 1,
        active: true,
        ...createArbolDto,
      };
      mockArbolRepository.create.mockResolvedValue(result);
      expect(await service.createArbol(createArbolDto)).toEqual(result);
      expect(mockArbolRepository.create).toHaveBeenCalledWith(createArbolDto);
    });
  });

  describe("findAll", () => {
    it("should return an array of arboles", async () => {
      const result: Arbol[] = [
        {
          id: 1,
          type: "Pino",
          statusTree: "SEMILLA",
          fincaId: 0,
          userId: 0,
          images: [],
          active: false,
          price: "",
        },
        {
          id: 2,
          type: "Roble",
          statusTree: "SEMILLA",
          fincaId: 0,
          userId: 0,
          images: [],
          active: true,
          price: "",
        },
      ];

      mockArbolRepository.findAll.mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(mockArbolRepository.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a single arbol", async () => {
      const result: Arbol = {
        id: 1,
        type: "Pino",
        statusTree: "SEMILLA",
        fincaId: 0,
        userId: 0,
        images: [],
        active: true,
        price: "",
      };
      const id = 1;

      mockArbolRepository.findOne.mockResolvedValue(result);

      expect(await service.findOne(id)).toEqual(result);
      expect(mockArbolRepository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe("update", () => {
    it("should update an existing arbol", async () => {
      const updateArbolDto: UpdateArbolDto = { type: "Roble" };
      const result: Arbol = {
        id: 1,
        type: "Roble",
        statusTree: "SEMILLA",
        fincaId: 0,
        userId: 0,
        images: [],
        active: true,
        price: "",
      };
      const id = 1;

      mockArbolRepository.update.mockResolvedValue(result);

      expect(await service.update(id, updateArbolDto)).toEqual(result);
      expect(mockArbolRepository.update).toHaveBeenCalledWith(
        id,
        updateArbolDto,
      );
    });
  });

  describe("remove", () => {
    it("should remove an arbol", async () => {
      const result: Arbol = {
        id: 1,
        type: "Pino",
        statusTree: "SEMILLA",
        fincaId: 0,
        userId: 0,
        images: [],
        active: true,
        price: "",
      };
      const id = 1;

      mockArbolRepository.remove.mockResolvedValue(result);

      expect(await service.remove(id)).toEqual(result);
      expect(mockArbolRepository.remove).toHaveBeenCalledWith(id);
    });
  });

  describe("findStatusTreeById", () => {
    it("should return the status of the arbol", async () => {
      const result = { id: 1, statusTree: "SALUDABLE" };
      const id = 1;

      mockArbolRepository.findStatusTreeById.mockResolvedValue(result);

      expect(await service.findStatusTreeById(id)).toEqual(result);
      expect(mockArbolRepository.findStatusTreeById).toHaveBeenCalledWith(id);
    });
  });
});
