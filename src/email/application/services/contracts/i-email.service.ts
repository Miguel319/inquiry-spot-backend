import { SendgridEmailParams } from "@/email/infrastructure/persistence/schemas";
import { User } from "@/user/infrastructure/persistence/schemas";

export interface IEmailsService {
  send(params: SendgridEmailParams): void;
  sendResetPasswordEmail(email: string, host: string): Promise<User>;
  sendContactDetails(name: string, message: string): Promise<void>;
}
