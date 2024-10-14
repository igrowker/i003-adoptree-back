import {
  Body,
  Controller,
  Delete,
  Injectable,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { RoleEnum } from "@prisma/client";
import { CheckRoles, GetAuthPayload } from "../auth/decorators";
import { UpdateUserDto } from "../auth/dto/update-profile.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Injectable()
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @CheckRoles(RoleEnum.USER)
  createUser(@Body() createUserDto: CreateUserDto) {
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
  @Post("adoptar-arbol/:treeId")
  //@UseGuards(AuthGuard("secret"))
  async buyTree(
    @GetAuthPayload("id") userId: number,
    @Param("treeId") treeId: number,
    @Body("shippingAddressId") shippingAddressId: number
  ) {
    await this.userService.buyOneTree(userId, treeId, shippingAddressId);
    return { message: "La adopción fue exitosa!" };
  }
}
