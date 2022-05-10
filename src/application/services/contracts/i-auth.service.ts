import { User } from "@/domain/entities/user.entity";
import { Response } from "express";

export interface IAuthResult {
  user: User;
  token: string;
}

export interface IAuthService {
  signUp(user: User): Promise<IAuthResult>;
  signIn(email: string, password: string): Promise<IAuthResult>;
  resetPassword(token: string): Promise<IAuthResult>;
  signOut(res: Response): void;
}
