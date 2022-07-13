import { User, UserDocument } from "../../../../domain/entities";
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
import { IAuthResult, IAuthService, IUsersService } from "../../contracts";
import crypto from "crypto";
import { UserTranslations } from "../../../../domain/types";
import { I18nContext, I18nService } from "nestjs-i18n";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject("IUsersService") private readonly _usersService: IUsersService,
    private readonly _i18n: I18nService,
    private readonly _jwtService: JwtService,
  ) {}

  async signUp(user: UserDocument, i18n?: I18nContext): Promise<IAuthResult> {
    await this.validateSignUpEmail(user.email, i18n as I18nContext);

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

    if (user && user.password) user.password;

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
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  private getToken({ email, _id, name }: User): string {
    return this._jwtService.sign({
      _id,
      name,
      email,
    });
  }
}
