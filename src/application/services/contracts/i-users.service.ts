import { User } from "@/domain/entities";
import { IBaseService } from "./i-base.service";

export interface IUsersService extends IBaseService<User> {
  findByEmail(email: string, signIn?: boolean): Promise<User>;
  findCurrent(): Promise<User | null>;
  findByToken(resetPasswordToken: string): Promise<User>;
}
