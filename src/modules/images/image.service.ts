import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Image } from "@prisma/client";
import { ImageRepository } from "./image.repository";
import { CreateImageDto } from "./dto/create-image.dto";

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  async createImageEntity(createImageDto: CreateImageDto, id: string, entity: 'user' | 'finca' | 'cosecha') {
          Number(entity)
          return  this.imageRepository.createImageEntity({
                url: createImageDto.url,
                entityNumber: Number(id),
                entityType: entity

  })}
  async findImageEntityById(id: number, entity: 'user' | 'finca' | 'cosecha') {

    const validEntities = ['user', 'finca', 'cosecha'];

    // manejo de errores a checkear
    if (!id) {
      throw new BadRequestException(`Falta id: ${id}`);
    }
    if (!validEntities.includes(entity)) {
      throw new BadRequestException(`Entidad no encontrada: ${entity}`);
    }
    
    let entityId = `${entity}Id`;
    const selectEntity = this.getSelectEntity(entity);
    return this.imageRepository.findImageEntityById(id, entityId, selectEntity)
   
  }
  
  async deleteImageEntityById(id:number, entity: 'user' | 'finca' | 'cosecha', entityId : number) {
    let entityParsed = `${entity}Id`;
    console.log(entityParsed)
    console.log(id)
    console.log(entity)

    return this.imageRepository.deleteImageEntityById(id, entityParsed, Number(entityId))
  }

  private getSelectEntity(entity: 'user' | 'finca' | 'cosecha') {
    switch (entity) {
      case 'user':
        return { user: true };
      case 'finca':
        return { finca: true };
      case 'cosecha':
        return { cosecha: true };
      default:
        return {};
    }
  }
}
  