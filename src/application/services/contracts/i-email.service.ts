import { SendgridEmailParams, User } from "@/domain/entities";
import { Request } from "express";

type Sender = {
  name: string;
  sender: string;
};

export interface IEmailsService {
  send(params: SendgridEmailParams): void;
  sendResetPasswordEmail(email: string, req: Request): Promise<User>;
  sendContactDetails(sender: Sender, message: string): Promise<void>;
}
