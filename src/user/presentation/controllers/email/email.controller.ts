import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { I18n, I18nContext } from "nestjs-i18n";
import { Response } from "express";
import { ContactEmailDto } from "@/user/infrastructure/dtos/mutations/email/contact-email.dto";
import { EmailTranslations } from "@/email/application/translations/email.translations";
import { IEmailsService } from "@/email/application/services/contracts/i-email.service";
import { ApiResponse } from "@/common/infrastructure/api";

@Controller("emails")
export class EmailsController {
  constructor(
    @Inject("IEmailsService")
    private readonly _emailService: IEmailsService,
  ) {}
  @Post("contact-details")
  async sendContactDetails(
    @Body() { name, message }: ContactEmailDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    await this._emailService.sendContactDetails(name, message);
    return ApiResponse.create({
      res,
      data: { name, message },
      message: i18n ? i18n.t(EmailTranslations.SEND_CONTACT_DETAIL) : "",
    });
  }
}
