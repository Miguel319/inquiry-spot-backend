import { User } from "@/domain/entities/user.entity";
import { Response } from "express";
import { I18nContext } from "nestjs-i18n";

export interface IAuthResult {
  user: User;
  token: string;
}

export interface IAuthService {
  signUp(user: User, i18n?: I18nContext): Promise<IAuthResult>;
  signIn(
    email: string,
    password: string,
    i18n?: I18nContext,
  ): Promise<IAuthResult>;
  resetPassword(token: string): Promise<IAuthResult>;
  signOut(res: Response): void;
}
