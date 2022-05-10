import { IUsersService } from "@/application/services/contracts";
import { User } from "@/domain/entities";
import { Controller, Get, Inject, Param } from "@nestjs/common";

@Controller("users")
export class UsersController {
  constructor(
    @Inject("IUsersService") private readonly usersService: IUsersService,
  ) {}

  @Get()
  async findAll(): Promise<Array<User>> {
    return await this.usersService.findAll();
  }

  @Get(":_id")
  async findById(@Param("_id") _id: string): Promise<User> {
    const user: User = await this.usersService.findById(_id);

    return user;
  }
}
