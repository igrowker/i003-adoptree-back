import { Injectable } from "@nestjs/common";
import { Prisma, Image} from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

export type ImageUserRepo = Prisma.ImageGetPayload<{
  include: {
    user: {
      select: {
        id: true;
      };
    };
  };
}>;


interface ImageCreateRepoInput {
  url: string;
  entityNumber: number;  // ID de la entidad
  entityType: 'user' | 'finca' | 'cosecha';  // Tipo de entidad
}

@Injectable()
export class ImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly commonIncludes = {
    finca: {
      select: {
        id: true,
        name: true,
      },
    },
  };

  async createImageEntity(input: ImageCreateRepoInput) {
    return this.prisma.image.create({
      include: {
        [input.entityType] : {
          select: {
            id: true,
            name: true
          }
        }
      },
      data: {
        url: input.url,
        [input.entityType]: { connect: { id: input.entityNumber } }, 
      }
    })
  }
  async findImageEntityById(id: number, entityId: string, selectEntity : any) {
    return this.prisma.image.findMany({
      where: {
        [entityId]: id,
      },
      select: {
        id: true,
        url: true,
        ...selectEntity
      },
    });
  }

  async deleteImageEntityById(id:number, entityParsed : string, entityId : number) {
    return this.prisma.image.deleteMany({
      where: {
        id: id,
        [entityParsed]: entityId,

      }
    })
  }

  async updateImageUrlByEntityId(id: number, url: string, entityParsed: string, entityId: number ){
    return this.prisma.image.updateMany({
      where: {
        id: id,
        [entityParsed] : entityId,
      },
      data: {
        url: url
      }
    })
  }
}