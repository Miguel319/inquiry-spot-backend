import { SendgridEmailParams, User } from "@/domain/entities";
import { Request } from "express";

export interface IEmailsService {
  send(params: SendgridEmailParams): void;
  sendResetPasswordEmail(email: string, req: Request): Promise<User>;
}
