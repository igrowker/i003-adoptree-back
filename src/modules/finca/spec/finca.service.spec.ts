import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Finca } from "@prisma/client";
import { CreateFincaDto } from "../dto/create-finca.dto";
import { UpdateFincaDto } from "../dto/update-finca.dto";
import { FincaRepository } from "../finca.repository";
import { FincaService } from "../finca.service";

describe("FincaService", () => {
  let fincaService: FincaService;

  const mockFincaRepository = {
    createFinca: jest.fn(),
    findAllFincas: jest.fn(),
    findFincaById: jest.fn(),
    updateFinca: jest.fn(),
    deleteFinca: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FincaService,
        {
          provide: FincaRepository,
          useValue: mockFincaRepository,
        },
      ],
    }).compile();

    fincaService = module.get<FincaService>(FincaService);
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
      const result: Finca = { id: 1, ...createFincaDto };

      mockFincaRepository.createFinca.mockResolvedValue(result);

      expect(await fincaService.createFinca(createFincaDto)).toEqual(result);
      expect(mockFincaRepository.createFinca).toHaveBeenCalledWith(
        createFincaDto
      );
    });
  });

  describe("updateFinca", () => {
    it("should update an existing finca", async () => {
      const id = 1;
      const updateFincaDto: UpdateFincaDto = {
        name: "Updated Finca",
        ubication: "Updated Location",
        practicesSustainable: "",
        images: [""],
        productor: ""
      };
      const existingFinca: Finca = {
        id,
        name: "",
        practicesSustainable: "",
        ubication: "",
        images: [""],
        productor: ""
      };

      mockFincaRepository.findFincaById.mockResolvedValue(existingFinca);
      mockFincaRepository.updateFinca.mockResolvedValue({
        ...existingFinca,
        ...updateFincaDto,
      });

      expect(await fincaService.updateFinca(id, updateFincaDto)).toEqual({
        ...existingFinca,
        ...updateFincaDto,
      });
      expect(mockFincaRepository.findFincaById).toHaveBeenCalledWith(id);
      expect(mockFincaRepository.updateFinca).toHaveBeenCalledWith(
        id,
        updateFincaDto
      );
    });

    it("should throw NotFoundException if finca not found", async () => {
      const id = 1;
      const updateFincaDto: UpdateFincaDto = {
        name: "Updated Finca",
        ubication: "Updated Location",
        practicesSustainable: "",
        images: [""],
        productor: ""
      };

      mockFincaRepository.findFincaById.mockResolvedValue(null);

      await expect(
        fincaService.updateFinca(id, updateFincaDto)
      ).rejects.toThrow(NotFoundException);
      expect(mockFincaRepository.findFincaById).toHaveBeenCalledWith(id);
    });
  });

  describe("deleteFinca", () => {
    it("should delete an existing finca", async () => {
      const id = 1;
      const existingFinca: Finca = {
        id,
        name: "Finca 1",
        ubication: "Location A",
        practicesSustainable: "",
        images: [""],
        productor: ""
      };

      mockFincaRepository.findFincaById.mockResolvedValue(existingFinca);
      mockFincaRepository.deleteFinca.mockResolvedValue(existingFinca);

      expect(await fincaService.deleteFinca(id)).toEqual(existingFinca);
      expect(mockFincaRepository.findFincaById).toHaveBeenCalledWith(id);
      expect(mockFincaRepository.deleteFinca).toHaveBeenCalledWith(id);
    });

    it("should throw NotFoundException if finca not found", async () => {
      const id = 1;

      mockFincaRepository.findFincaById.mockResolvedValue(null);

      await expect(fincaService.deleteFinca(id)).rejects.toThrow(
        NotFoundException
      );
      expect(mockFincaRepository.findFincaById).toHaveBeenCalledWith(id);
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

      mockFincaRepository.findAllFincas.mockResolvedValue(result);

      expect(await fincaService.getAllFincas()).toEqual(result);
      expect(mockFincaRepository.findAllFincas).toHaveBeenCalled();
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

      mockFincaRepository.findFincaById.mockResolvedValue(result);

      expect(await fincaService.getFincaDetails(id)).toEqual(result);
      expect(mockFincaRepository.findFincaById).toHaveBeenCalledWith(id);
    });

    it("should throw NotFoundException if finca not found", async () => {
      const id = 1;

      mockFincaRepository.findFincaById.mockResolvedValue(null);

      await expect(fincaService.getFincaDetails(id)).rejects.toThrow(
        NotFoundException
      );
      expect(mockFincaRepository.findFincaById).toHaveBeenCalledWith(id);
    });
  });
});
