import {
  IAuthResult,
  IAuthService,
  IEmailsService,
} from "@/application/services/contracts";
import { User } from "@/domain/entities";
import { ApiResponse } from "../../../infrastructure/common/api/api-response";
import { SignInDto, SignUpDto } from "../../../infrastructure/dtos";
import { PresenterFactory } from "../../../infrastructure/presenters";
import { UserPresenter } from "../../../infrastructure/presenters";
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
import { Response, Request } from "express";
import { I18nValidationExceptionFilter } from "nestjs-i18n";

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
  ): Promise<Response> {
    const authResult: IAuthResult = (await this._authService.signUp(
      signupDto as unknown as User,
    )) as IAuthResult;

    const user: UserPresenter = PresenterFactory.getInstance(
      authResult.user,
      "user",
    ) as UserPresenter;

    return ApiResponse.signUpSuccessfully({
      user: user as User,
      token: authResult.token,
      res,
    });
  }

  @Post("sign-in")
  async signIn(
    @Body() { email, password }: SignInDto,
    @Res() res: Response,
  ): Promise<Response> {
    const authResult = (await this._authService.signIn(
      email,
      password,
    )) as IAuthResult;

    const user: UserPresenter = PresenterFactory.getInstance(
      authResult.user,
      "user",
    ) as UserPresenter;

    return ApiResponse.signInSuccessfully({
      user: user as User,
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
  async resetPassword(@Param("token") token: string, @Res() res: Response) {
    const authResult: IAuthResult = await this._authService.resetPassword(
      token,
    );

    const user: UserPresenter = PresenterFactory.getInstance(
      authResult.user,
      "user",
    ) as UserPresenter;

    return ApiResponse.signInSuccessfully({
      user: user as User,
      token: authResult.token,
      res,
    });
  }

  @Delete("sign-out")
  async signOut(@Res() res: Response) {
    this._authService.signOut(res);

    return ApiResponse.createSuccessfully({
      message: "Sign out successfully!",
      res,
    });
  }
}
