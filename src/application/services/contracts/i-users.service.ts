import { User } from "@/domain/entities";
import { I18nContext } from "nestjs-i18n";
import { IBaseService } from "./i-base.service";

export interface IUsersService extends IBaseService<User> {
  findByEmail(
    email: string,
    signIn?: boolean,
    i18n?: I18nContext,
  ): Promise<User>;
  findCurrent(i18n?: I18nContext): Promise<User | null>;
  findByToken(resetPasswordToken: string): Promise<User>;
}
