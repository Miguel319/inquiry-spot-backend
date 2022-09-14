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
import { User, UserDocument } from "@/user/infrastructure/persistence/schemas";
import { ApiResponse } from "@/common/infrastructure/api";
import { AuthTranslations } from "@/user/application/translations";
import { IEmailsService } from "@/email/application/services/contracts";
import {
  IAuthResult,
  IAuthService,
} from "@/user/application/services/contracts";
import { SignInDto, SignUpDto } from "@/user/infrastructure/dtos";
import {
  PresenterFactory,
  UserPresenter,
} from "@/common/infrastructure/presenters";

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
    const authResult: IAuthResult = await this._authService.signUp(
      signupDto as unknown as User,
      i18n,
    );

    const user: UserPresenter = PresenterFactory.getInstance(
      authResult.user as UserDocument,
      "user",
    ) as UserPresenter;

    return ApiResponse.signUp({
      user,
      token: authResult.token,
      message: i18n ? i18n.t(AuthTranslations.SIGN_UP) : "",
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
    const authResult = await this._authService.signIn(email, password, i18n);

    const user: UserPresenter = PresenterFactory.getInstance(
      authResult.user as UserDocument,
      "user",
    ) as UserPresenter;

    return ApiResponse.signIn({
      user,
      message: i18n ? i18n.t(AuthTranslations.SIGN_IN) : "",
      token: authResult.token,
      res,
    });
  }

  @Put("forgot-password/")
  forgotPassword(@Body("email") email: string, @Req() req: Request) {
    return this._emailsService.sendResetPasswordEmail(email, req);
  }

  @Put("reset-password/:token")
  async resetPassword(
    @Param("token") token: string,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    const authResult: IAuthResult = await this._authService.resetPassword(
      token,
    );

    const user: UserPresenter = PresenterFactory.getInstance(
      authResult.user as UserDocument,
      "user",
    ) as UserPresenter;

    return ApiResponse.signIn({
      user: user,
      token: authResult.token,
      message: i18n ? i18n.t(AuthTranslations.PASSWORD_RESET) : "",
      res,
    });
  }

  @Delete("sign-out")
  signOut(@Res() res: Response, @I18n() i18n: I18nContext) {
    this._authService.signOut(res);

    return ApiResponse.delete({
      message: i18n ? i18n.t(AuthTranslations.SIGN_OUT) : "",
      res,
    });
  }
}
