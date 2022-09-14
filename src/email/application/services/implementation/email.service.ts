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
import { Request } from "express";
import { IEmailsService } from "../contracts";

@Injectable()
export class EmailsService implements IEmailsService {
  private readonly sendGrid;

  constructor(
    @Inject("IUsersService") private readonly _usersService: IUsersService,
    private readonly _emailRepo: EmailsRepository,
  ) {
    this.sendGrid = require("@sendgrid/mail");
    this.sendGrid.setApiKey(process.env["SENDGRID_API_KEY"]);
  }

  async sendContactDetails(
    { name }: { name: string; sender: string },
    message: string,
  ): Promise<void> {
    const receiver = String(process.env.SENDGRID_API_KEY);

    const html = `
      <div>Hi, there. ${name} wants to contact you!</div>

      <p>${message}</p>
    `;

    await this.send({
      html,
      subject: "Contact",
      to: receiver,
    });
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
    req: Request,
  ): Promise<string> {
    const resetToken: string = await this.getResetPasswordToken(user);

    const resetUrl = `${req.protocol}://${req.get(
      "host",
    )}/auth/reset-password/${resetToken}`;

    return `
        <h1>Reset Password</h1>
    
        <p>Hi, ${user.name}!</p>
        
        <p>
          You receiving this email because you requested a password reset. Please, go to the next link to reset your password:
        </p>   
    
        <p><${resetUrl}/p>
     `;
  }

  async sendResetPasswordEmail(email: string, req: Request): Promise<User> {
    const user: UserDocument = (await this._usersService.findByEmail(
      email,
    )) as UserDocument;

    if (!user) throw new NotFoundException("User not found.");

    const message: string = await this.buildResetPasswordEmail(user, req);

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
      .then(() => console.log("Email sent"))
      .catch((error: unknown) => console.log("error", error));

    await this._emailRepo.create({
      ...emailBody,
      recipientEmailAddress: emailBody.to,
      body: emailBody.html,
    });
  }
}
