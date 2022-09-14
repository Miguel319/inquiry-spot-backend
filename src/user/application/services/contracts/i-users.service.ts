import { User, UserDocument } from "@/user/infrastructure/persistence/schemas";
import { I18nContext } from "nestjs-i18n";
import { IBaseService } from "../../../../common/application/services/contracts/i-base.service";

export interface IUsersService extends IBaseService<UserDocument> {
  findByEmail(
    email: string,
    signIn?: boolean,
    i18n?: I18nContext,
  ): Promise<User>;
  findCurrent(i18n?: I18nContext): Promise<User | null>;
  findByToken(resetPasswordToken: string): Promise<User>;
}
