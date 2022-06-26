import { IUsersService } from "@/application/services/contracts";
import { User } from "@/domain/entities";
import { JwtAuthGuard } from "../../guards";
import {
  Controller,
  Get,
  Inject,
  Param,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { I18nValidationExceptionFilter } from "nestjs-i18n";

@Controller("users")
export class UsersController {
  constructor(
    @Inject("IUsersService") private readonly usersService: IUsersService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Array<User>> {
    return await this.usersService.findAll();
  }

  @Get(":_id")
  @UseFilters(new I18nValidationExceptionFilter())
  async findById(@Param("_id") _id: string): Promise<User> {
    const user: User = await this.usersService.findById(_id);

    return user;
  }

  @Get("current/user")
  @UseGuards(JwtAuthGuard)
  async helloWorld(): Promise<User | null> {
    const user: User | null = await this.usersService.findCurrent();

    return user;
  }
}
