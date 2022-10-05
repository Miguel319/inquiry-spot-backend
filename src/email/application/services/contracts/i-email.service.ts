import { SendgridEmailParams } from "@/email/infrastructure/persistence/schemas";
import { User } from "@/user/infrastructure/persistence/schemas";
import { Request } from "express";

export interface IEmailsService {
  send(params: SendgridEmailParams): void;
  sendResetPasswordEmail(email: string, req: Request): Promise<User>;
  sendContactDetails(name: string, message: string): Promise<void>;
}
