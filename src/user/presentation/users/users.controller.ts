import { JwtAuthGuard } from "../../infrastructure/guards";
import {
  Controller,
  Get,
  Inject,
  Param,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";
import { User } from "@/user/infrastructure/persistence/schemas";
import { IUsersService } from "@/user/application/services/contracts";

@Controller("users")
export class UsersController {
  constructor(
    @Inject("IUsersService") private readonly usersService: IUsersService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(":_id")
  @UseFilters(new I18nValidationExceptionFilter())
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<User> {
    return this.usersService.findById(_id, i18n);
  }

  @Get("by-email/:email")
  @UseFilters(new I18nValidationExceptionFilter())
  findByEmail(
    @Param("email") email: string,
    @I18n() i18n: I18nContext,
  ): Promise<User> {
    return this.usersService.findByEmail(email, false, i18n);
  }

  @Get("current/user")
  @UseGuards(JwtAuthGuard)
  getCurrentUser(): Promise<User | null> {
    return this.usersService.findCurrent();
  }
}
