import { User, UserDocument } from "@/domain/entities";
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import bcrypt from "bcrypt";
import { IAuthResult, IAuthService, IUsersService } from "../../contracts";
import crypto from "crypto";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject("IUsersService") private readonly _usersService: IUsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async signUp(user: User): Promise<IAuthResult> {
    await this.validateSignUpEmail(user.email);

    const newUser = await this._usersService.create?.(
      await this.handleUserSignUp(user),
    );

    if (!newUser)
      throw new InternalServerErrorException("Could not create user");

    const authResult: IAuthResult = {
      user: newUser,
      token: this.getToken(newUser),
    };

    return authResult;
  }

  async signIn(email: string, password: string): Promise<IAuthResult> {
    const user: Partial<User> = await this._usersService.findByEmail(
      email,
      true,
    );

    await this.validatePassword(user as User, password);

    delete user.password;

    if (user && user.password) user.password;

    const authResult: IAuthResult = {
      user: user as User,
      token: this.getToken(user as User),
    };

    return authResult;
  }

  async resetPassword(token: string): Promise<IAuthResult> {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user: UserDocument = (await this._usersService.findByToken(
      resetPasswordToken,
    )) as UserDocument;

    user.password = await this.hashPassword(user.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    const authResult: IAuthResult = {
      user: user as User,
      token: this.getToken(user as User),
    };

    return authResult;
  }

  signOut(res: Response<unknown, Record<string, unknown>>): void {
    res.clearCookie("token");
  }

  private async validatePassword(user: User, password: string): Promise<void> {
    const isPasswordRight: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordRight) throw new ForbiddenException("Invalid credentials.");
  }

  private async validateSignUpEmail(email: string): Promise<void> {
    const user: User | null = await this._usersService.findByEmail(email);

    if (user)
      throw new BadRequestException("The provided email is already taken.");
  }

  private async handleUserSignUp(user: User): Promise<User> {
    user.password = await this.hashPassword(user.password);

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  private getToken({ email, _id, name }: User): string {
    return this._jwtService.sign({
      _id,
      name,
      email,
    });
  }
}
