import { LoggerService } from "@/common/infrastructure/logger";
import { EmailsRepository } from "@/email/infrastructure/persistence/repositories";
import {
  SendgridEmail,
  SendgridEmailParams,
} from "@/email/infrastructure/persistence/schemas";
import { IUsersService } from "@/user/application/services/contracts";
import { User, UserDocument } from "@/user/infrastructure/persistence/schemas";
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import crypto from "crypto";
import { IEmailsService } from "../contracts";
import { EmailHtml } from "./email.html";

@Injectable()
export class EmailsService implements IEmailsService {
  private readonly sendGrid;

  constructor(
    @Inject("IUsersService") private readonly _usersService: IUsersService,
    private readonly _emailRepo: EmailsRepository,
    private readonly _logger: LoggerService,
  ) {
    this.sendGrid = require("@sendgrid/mail");
    this.sendGrid.setApiKey(process.env["SENDGRID_API_KEY"]);
  }

  async sendContactDetails(name: string, message: string): Promise<void> {
    const subject = `Contact from ${name}`;
    const to = String(process.env["RECEIVE_EMAIL"]);
    const html = EmailHtml.getEmailHtml(name, message);
    await this.send({ html, subject, to });
  }

  private buildEmail({
    html,
    subject,
    to,
  }: SendgridEmailParams): SendgridEmail {
    const senderEmail = String(process.env["SENDER_EMAIL"]);

    return {
      from: {
        email: senderEmail,
        name: "Inquiry Spot",
      },
      to,
      subject,
      html,
    };
  }

  private async getResetPasswordToken(user: UserDocument): Promise<string> {
    const resetToken: string = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const oneHourFromNow: number = Date.now() + 3600 * 1000;

    user.resetPasswordExpire = oneHourFromNow;

    await user.save({ validateBeforeSave: false });

    return resetToken;
  }

  private async buildResetPasswordEmail(
    user: UserDocument,
    host: string,
  ): Promise<string> {
    const resetToken: string = await this.getResetPasswordToken(user);
    console.log(host);
    const resetUrl = `${host}/auth/reset-password/${resetToken}`;

    return EmailHtml.getEmailResetPasswordHtml(user.name, resetUrl);
  }

  async sendResetPasswordEmail(email: string, host: string): Promise<User> {
    const user: UserDocument = (await this._usersService.findByEmail(
      email,
    )) as UserDocument;

    if (!user) throw new NotFoundException("User not found.");

    const message: string = await this.buildResetPasswordEmail(user, host);

    try {
      await this.send({
        html: message,
        subject: "Reset Password",
        to: user.email,
      });

      return user as User;
    } catch (error) {
      user.resetPasswordExpire = undefined;
      user.resetPasswordToken = undefined;

      await user.save({ validateBeforeSave: false });

      throw new BadRequestException("Could not send email.");
    }
  }

  async send(params: SendgridEmailParams): Promise<void> {
    const emailBody = this.buildEmail(params);

    this.sendGrid
      .send(emailBody)
      .then(() =>
        this._logger.log("Email", `Email sent. Subject = ${emailBody.subject}`),
      )
      .catch((error: unknown) =>
        this._logger.error(
          "Email",
          `Could not send email. ${JSON.stringify(error)}`,
        ),
      );

    await this._emailRepo.create({
      ...emailBody,
      recipientEmailAddress: emailBody.to,
      body: emailBody.html,
    });
  }
}
