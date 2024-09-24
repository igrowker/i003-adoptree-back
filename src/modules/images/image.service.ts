import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Image } from "@prisma/client";
import { ImageRepository } from "./image.repository";
import { CreateImageDto } from "./dto/create-image.dto";

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  async createImageEntity(createImageDto: CreateImageDto, id: string, entity: 'user' | 'finca' | 'cosecha') {
          console.log(entity)
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
    return this.imageRepository.deleteImageEntityById(id, entityParsed, Number(entityId))
  }

  async updateImageUrlByEntityId(id: number, createImageDto: CreateImageDto, entity: 'user' | 'finca' | 'cosecha', entityId: number) {
    const validEntities = ['user', 'finca', 'cosecha'];
    if(!id) {
      throw new BadRequestException('Falta id de la imagen')
    }
    if(!validEntities.includes(entity)) {
      throw new BadRequestException('Falta entity como query')
    }
    if(!createImageDto.url) {
      throw new BadRequestException('No se encontro URL en el body')
    }

    let url = createImageDto.url
    let entityParsed = `${entity}Id`;
    const selectEntity = this.getSelectEntity(entity)
    return this.imageRepository.updateImageUrlByEntityId(id, url, entityParsed, Number(entityId))
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
  