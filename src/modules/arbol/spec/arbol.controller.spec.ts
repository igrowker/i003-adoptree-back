import { Test, TestingModule } from "@nestjs/testing";
import { Arbol } from "@prisma/client";
import { ArbolController } from "../arbol.controller";
import { ArbolService } from "../arbol.service";
import { CreateArbolDto } from "../dto/create-arbol.dto";
import { UpdateArbolDto } from "../dto/update-arbol";

describe("ArbolController", () => {
  let controller: ArbolController;

  const mockArbolService = {
    createArbol: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findStatusTreeById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArbolController],
      providers: [
        {
          provide: ArbolService,
          useValue: mockArbolService,
        },
      ],
    }).compile();

    controller = module.get<ArbolController>(ArbolController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("createArbol", () => {
    it("should create a new arbol", async () => {
      const createArbolDto: CreateArbolDto = {
        type: "Pino",
        fincaId: 1,
        userId: 1,
        statusTree: "SEMILLA",
        images: [],
        price: ""
      };
      const result: Arbol = { id: 1, ...createArbolDto, active: true };

      mockArbolService.createArbol.mockResolvedValue(result);

      expect(await controller.createArbol(createArbolDto)).toEqual(result);
      expect(mockArbolService.createArbol).toHaveBeenCalledWith(createArbolDto);
    });
  });

  describe("findAll", () => {
    it("should return an array of arboles", async () => {
      const result: Arbol[] = [
        {
          id: 1,
          type: "Pino",
          statusTree: "SEMILLA",
          fincaId: 1,
          userId: 1,
          active: true,
          images: [],
          price: ""
        },
        {
          id: 2,
          type: "Roble",
          statusTree: "SEMILLA",
          fincaId: 1,
          userId: 2,
          active: true,
          images: [],
          price: ""
        },
      ];

      mockArbolService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockArbolService.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a single arbol", async () => {
      const result: Arbol = {
        id: 1,
        type: "Pino",
        statusTree: "SEMILLA",
        fincaId: 1,
        userId: 1,
        active: true,
        images:[],
        price:""
      };
      const id = "1";

      // Aquí es donde se corrige el mock
      mockArbolService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
      expect(mockArbolService.findOne).toHaveBeenCalledWith(Number(id));
    });
  });

  describe("update", () => {
    it("should update an existing arbol", async () => {
      const updateArbolDto: UpdateArbolDto = { type: "Roble" };
      const result: Arbol = {
        id: 1,
        type: "Roble",
        statusTree: "SEMILLA",
        fincaId: 1,
        userId: 1,
        active: true,
        images:[],
        price: ""
      };
      const id = 1;

      mockArbolService.update.mockResolvedValue(result);

      expect(await controller.update(id, updateArbolDto)).toEqual(result);
      expect(mockArbolService.update).toHaveBeenCalledWith(id, updateArbolDto);
    });
  });

  describe("remove", () => {
    it("should remove an arbol", async () => {
      const result: Arbol = {
        id: 1,
        type: "Pino",
        statusTree: "SEMILLA",
        fincaId: 1,
        userId: 1,
        active: true,
        images:[],
        price: ""
      };
      const id = 1;

      mockArbolService.remove.mockResolvedValue(result);

      expect(await controller.remove(id)).toEqual(result);
      expect(mockArbolService.remove).toHaveBeenCalledWith(id);
    });
  });

  describe("findStatusTreeById", () => {
    it("should return the status of the arbol", async () => {
      const result = { id: 1, statusTree: "SALUDABLE" };
      const id = "1";

      mockArbolService.findStatusTreeById.mockResolvedValue(result);

      expect(await controller.findStatusTreeById(id)).toEqual(result);
      expect(mockArbolService.findStatusTreeById).toHaveBeenCalledWith(
        Number(id)
      );
    });
  });
});
