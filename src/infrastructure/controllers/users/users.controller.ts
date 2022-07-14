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
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";

@Controller("users")
export class UsersController {
  constructor(
    @Inject("IUsersService") private readonly usersService: IUsersService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(":_id")
  @UseFilters(new I18nValidationExceptionFilter())
  async findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<User> {
    const user: User = await this.usersService.findById(_id, i18n);

    return user;
  }

  @Get("by-email/:email")
  @UseFilters(new I18nValidationExceptionFilter())
  async findByEmail(
    @Param("email") email: string,
    @I18n() i18n: I18nContext,
  ): Promise<User> {
    const user: User = await this.usersService.findByEmail(email, true, i18n);
    console.log(email);
    return user;
  }

  @Get("current/user")
  @UseGuards(JwtAuthGuard)
  async helloWorld(): Promise<User | null> {
    const user: User | null = await this.usersService.findCurrent();

    return user;
  }
}
