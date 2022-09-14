import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { I18nContext, I18nService } from "nestjs-i18n";
import axios from "axios";
import { User, UserDocument } from "@/user/infrastructure/persistence/schemas";
import { UserTranslations } from "@/user/application/translations";
import { ChatUser } from "@/user/domain/types";
import { IAuthResult, IAuthService, IUsersService } from "../../contracts";
import { IEmailsService } from "@/email/application/services/contracts";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject("IUsersService") private readonly _usersService: IUsersService,
    private readonly _i18n: I18nService,
    private readonly _jwtService: JwtService,
    @Inject("IEmailsService") private readonly _emailsService: IEmailsService,
  ) {}

  async signUp(user: UserDocument, i18n?: I18nContext): Promise<IAuthResult> {
    await this.validateSignUpEmail(user.email, i18n as I18nContext);
    await this.createChatUser(user);

    const newUser = await this._usersService.create?.(
      await this.handleUserSignUp(user),
    );

    if (!newUser)
      throw new InternalServerErrorException(
        i18n
          ? i18n.t(UserTranslations.USER_CREATION_ERROR)
          : this._i18n.t(UserTranslations.USER_CREATION_ERROR),
      );

    const authResult: IAuthResult = {
      user: newUser,
      token: this.getToken(newUser),
    };

    return authResult;
  }

  async signIn(
    email: string,
    password: string,
    i18n?: I18nContext,
  ): Promise<IAuthResult> {
    const user: Partial<User> = await this._usersService.findByEmail(
      email,
      true,
    );

    if (!user)
      throw new ForbiddenException(
        i18n
          ? i18n.t(UserTranslations.INVALID_CREDENTIALS)
          : this._i18n.t(UserTranslations.INVALID_CREDENTIALS),
      );

    await this.validatePassword(user as User, password, i18n);

    delete user.password;

    const authResult: IAuthResult = {
      user: user as User,
      token: this.getToken(user as User),
    };

    return authResult;
  }

  async resetPassword(token: string): Promise<IAuthResult> {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user: UserDocument = (await this._usersService.findByToken(
      resetPasswordToken,
    )) as UserDocument;

    user.password = await this.hashPassword(user.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    const authResult: IAuthResult = {
      user: user as User,
      token: this.getToken(user as User),
    };

    return authResult;
  }

  signOut(res: Response<unknown, Record<string, unknown>>): void {
    res.clearCookie("token");
  }

  private async createChatUser(user: User, i18n?: I18nContext): Promise<void> {
    try {
      this._emailsService;

      const chatUser = {
        email: user.email,
        first_name: user.name,
        secret: user.email,
        username: user.email,
      } as ChatUser;

      await axios.post(String(process.env.CHAT_ENGINE_URL), chatUser, {
        headers: {
          "PRIVATE-KEY": String(process.env.CHAT_PRIVATE_KEY),
        },
      });
    } catch (error) {
      const message = error?.response?.data?.message as string;

      if (message.includes("This username is taken"))
        throw new BadRequestException(
          i18n
            ? i18n.t(UserTranslations.DUPLICATE_EMAIL)
            : this._i18n.t(UserTranslations.DUPLICATE_EMAIL),
        );

      throw error.response.data;
    }
  }

  private async validatePassword(
    user: User,
    password: string,
    i18n?: I18nContext,
  ): Promise<void> {
    const isPasswordRight: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordRight)
      throw new ForbiddenException(
        i18n
          ? i18n.t(UserTranslations.INVALID_CREDENTIALS)
          : this._i18n.t(UserTranslations.INVALID_CREDENTIALS),
      );
  }

  private async validateSignUpEmail(
    email: string,
    i18n: I18nContext,
  ): Promise<void> {
    const user: User | null = await this._usersService.findByEmail(email);

    if (user)
      throw new BadRequestException(
        i18n
          ? i18n.t(UserTranslations.DUPLICATE_EMAIL)
          : this._i18n.t(UserTranslations.DUPLICATE_EMAIL),
      );
  }

  private async handleUserSignUp(user: UserDocument): Promise<UserDocument> {
    user.password = await this.hashPassword(user.password);

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
  }

  private getToken({ email, _id, name }: User): string {
    return this._jwtService.sign({
      _id,
      name,
      email,
    });
  }
}
