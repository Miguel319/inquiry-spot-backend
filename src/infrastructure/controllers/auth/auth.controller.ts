import {
  IAuthResult,
  IAuthService,
  IEmailsService,
} from "@/application/services/contracts";
import { User } from "@/domain/entities";
import { ApiResponse } from "../../../infrastructure/common/api";
import { SignInDto, SignUpDto } from "@/infrastructure/dtos";
import { PresenterFactory, UserPresenter } from "@/infrastructure/presenters";
import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseFilters,
} from "@nestjs/common";
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";
import { Response, Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject("IAuthService") private readonly _authService: IAuthService,
    @Inject("IEmailsService") private readonly _emailsService: IEmailsService,
  ) {}

  @Post("sign-up")
  @UseFilters(new I18nValidationExceptionFilter())
  async signUp(
    @Body() signupDto: SignUpDto,
    @Res() res: Response,
    @I18n() i18n: I18nContext,
  ): Promise<Response> {
    const authResult: IAuthResult = (await this._authService.signUp(
      signupDto as unknown as User,
    )) as IAuthResult;

    const user: UserPresenter = PresenterFactory.getInstance(
      authResult.user,
      "user",
    ) as UserPresenter;

    return ApiResponse.signUp({
      user: user as User,
      token: authResult.token,
      message: i18n.t("general.auth.signUp"),
      res,
    });
  }

  @Post("sign-in")
  @UseFilters(new I18nValidationExceptionFilter())
  async signIn(
    @Body() { email, password }: SignInDto,
    @Res() res: Response,
    @I18n() i18n: I18nContext,
  ): Promise<Response> {
    const authResult = (await this._authService.signIn(
      email,
      password,
    )) as IAuthResult;

    const user: UserPresenter = PresenterFactory.getInstance(
      authResult.user,
      "user",
    ) as UserPresenter;

    return ApiResponse.signIn({
      user: user as User,
      message: i18n.t("general.auth.signIn"),
      token: authResult.token,
      res,
    });
  }

  @Put("forgot-password/")
  async forgotPassword(@Body("email") email: string, @Req() req: Request) {
    return await this._emailsService.sendResetPasswordEmail(
      email,
      req as Request,
    );
  }

  @Put("reset-password/:token")
  async resetPassword(
    @Param("token") token: string,
    @Res() res: Response,
    @I18n() i18n: I18nContext,
  ) {
    const authResult: IAuthResult = await this._authService.resetPassword(
      token,
    );

    const user: UserPresenter = PresenterFactory.getInstance(
      authResult.user,
      "user",
    ) as UserPresenter;

    return ApiResponse.signIn({
      user: user as User,
      token: authResult.token,
      message: i18n.t("general.auth.passwordReset"),
      res,
    });
  }

  @Delete("sign-out")
  signOut(@Res() res: Response, @I18n() i18n: I18nContext) {
    this._authService.signOut(res);

    return ApiResponse.delete({
      message: i18n.t("general.auth.signOut"),
      res,
    });
  }
}
