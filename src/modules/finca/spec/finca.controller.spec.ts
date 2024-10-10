import { Test, TestingModule } from "@nestjs/testing";
import { Finca } from "@prisma/client";
import { CreateFincaDto } from "../dto/create-finca.dto";
import { UpdateFincaDto } from "../dto/update-finca.dto";
import { FincaController } from "../finca.controller";
import { FincaService } from "../finca.service";

describe("FincaController", () => {
  let fincaController: FincaController;

  const mockFincaService = {
    createFinca: jest.fn(),
    getAllFincas: jest.fn(),
    getFincaDetails: jest.fn(),
    updateFinca: jest.fn(),
    deleteFinca: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FincaController],
      providers: [
        {
          provide: FincaService,
          useValue: mockFincaService,
        },
      ],
    }).compile();

    fincaController = module.get<FincaController>(FincaController);
  });

  describe("createFinca", () => {
    it("should create a new finca", async () => {
      const createFincaDto: CreateFincaDto = {
        name: "Finca 1",
        ubication: "Location A",
        practicesSustainable: "",
        images: [""],
        productor: ""
      };
      const result: Finca = {
        id: 1,
        ...createFincaDto,
        practicesSustainable: "",
        images: [""]
      }; // Asegúrate de incluir todos los campos requeridos.

      mockFincaService.createFinca.mockResolvedValue(result);

      expect(await fincaController.createFinca(createFincaDto)).toEqual(result);
      expect(mockFincaService.createFinca).toHaveBeenCalledWith(createFincaDto);
    });
  });

  describe("getAllFincas", () => {
    it("should return an array of fincas", async () => {
      const result: Finca[] = [
        {
          id: 1,
          name: "Finca 1",
          ubication: "Location A",
          practicesSustainable: "",
          images: [""],
          productor: ""
        },
        {
          id: 2,
          name: "Finca 2",
          ubication: "Location B",
          practicesSustainable: "",
          images: [""],
          productor: ""
        },
      ];

      mockFincaService.getAllFincas.mockResolvedValue(result);

      expect(await fincaController.getAllFincas()).toEqual(result);
      expect(mockFincaService.getAllFincas).toHaveBeenCalled();
    });
  });

  describe("getFincaDetails", () => {
    it("should return a single finca", async () => {
      const id = 1;
      const result: Finca = {
        id,
        name: "Finca 1",
        ubication: "Location A",
        practicesSustainable: "",
        images: [""],
        productor: ""
      };

      mockFincaService.getFincaDetails.mockResolvedValue(result);

      expect(await fincaController.getFincaDetails(id)).toEqual(result);
      expect(mockFincaService.getFincaDetails).toHaveBeenCalledWith(id);
    });
  });

  describe("updateFinca", () => {
    it("should update a finca", async () => {
      const id = 1;
      const updateFincaDto: UpdateFincaDto = {
        name: "Updated Finca",
        ubication: "Updated Location",
        practicesSustainable: "",
        images: [""],
        productor: ""
      };
      const result: Finca = {
        id,
        ...updateFincaDto,
        practicesSustainable: "",
        images: [""],
        name: "",
        ubication: "",
        productor: ""
      };

      mockFincaService.updateFinca.mockResolvedValue(result);

      expect(await fincaController.updateFinca(id, updateFincaDto)).toEqual(
        result
      );
      expect(mockFincaService.updateFinca).toHaveBeenCalledWith(
        id,
        updateFincaDto
      );
    });
  });

  describe("deleteFinca", () => {
    it("should delete a finca", async () => {
      const id = 1;
      const result: Finca = {
        id,
        name: "Finca 1",
        ubication: "Location A",
        practicesSustainable: "",
        images: [""],
        productor: ""
      };

      mockFincaService.deleteFinca.mockResolvedValue(result);

      expect(await fincaController.deleteFinca(id)).toEqual(result);
      expect(mockFincaService.deleteFinca).toHaveBeenCalledWith(id);
    });
  });
});
