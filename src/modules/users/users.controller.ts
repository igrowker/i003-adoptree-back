import {
  Body,
  Controller,
  Delete,
  Injectable,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { RoleEnum } from "@prisma/client";
import { UpdateUserDto } from "../auth/dto/update-profile.dto";
import { CreateUserDto } from "./dto/create-user.dto"; // Ajusta la ruta según tu estructura
import { UsersService } from "./users.service";
import { GetAuthPayload } from "../auth/decorators";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const role: RoleEnum = RoleEnum.USER;
    return this.userService.create(createUserDto);
  }

  @Put(":id")
  updateUser(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(Number(id), updateUserDto);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: number) {
    return this.userService.remove(Number(id));
  }

  
  @Post('adoptar-arbol/:treeId')
  @UseGuards(AuthGuard("secret"))
  async buyTree(@GetAuthPayload("id") authPayload: any,@Body('userId') userId: number, @Param('treeId') treeId: number) {
    //await this.userService.buyOneTree(userId, treeId);
    return { message: 'Tree adoption is successfully!'+`${userId}, ${treeId},${authPayload}` };
  }
}
