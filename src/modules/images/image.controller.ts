import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
  } from "@nestjs/common";
import { ImageService } from "./image.service";
import { CreateImageDto } from "./dto/create-image.dto";
import { Image } from "@prisma/client";

@Controller("images")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('post/:id/post')
  async createImageEntity(
    @Body() createImageDto : CreateImageDto,
    @Param('id') id: string,
    @Query('entity') entity : 'user' | 'finca' | 'cosecha',
    
  ){
    return this.imageService.createImageEntity(createImageDto, id, entity)
  }

   @Get("get-images/:id/entity")
  async findImageEntityById(
    @Param("id") id: string,
    @Query('entity') entity : 'user' | 'finca' | 'cosecha',
  ) {
    return this.imageService.findImageEntityById(Number(id), entity);
  }

  @Delete("delete-image/:id/entity")
  async deleteImageEntityById(
    @Param("id") id: string,
    @Query('entity') entity : 'user' | 'finca' | 'cosecha',
    @Query('entityId') entityId : number,
  ) {
    return this.imageService.deleteImageEntityById(Number(id), entity, entityId)
  }

  @Put("update-image/:id/entity")
  async updateImageByEntityId(
    @Param("id") id : string,
    @Query("entity") entity : 'user' | 'finca' | 'cosecha',
    @Query("entityId") entityId : number,
    @Body() createImageDto : CreateImageDto,
  ) {
    return this.imageService.updateImageUrlByEntityId(Number(id),createImageDto, entity, entityId )
  }
}