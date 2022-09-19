import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { I18nContext, I18nService } from "nestjs-i18n";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { UsersRepository } from "@/user/infrastructure/persistence/repositories/user";
import { UserTranslations } from "@/user/application/translations";
import { User, UserDocument } from "@/user/infrastructure/persistence/schemas";
import { IUsersService } from "../../contracts";

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    @Inject(REQUEST) private readonly request: Request,
    private readonly _i18n: I18nService,
  ) {}

  async findByEmail(email: string, signIn = false): Promise<User> {
    const user = signIn
      ? ((await this.userRepository.findOne(
          { email },
          {},
          { projection: "+password name email" },
        )) as User)
      : ((await this.userRepository.findOne({ email }, {})) as User);

    return user;
  }

  async findByToken(
    resetPasswordToken: string,
    i18n?: I18nContext,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      throw new BadRequestException(
        i18n
          ? i18n.t(UserTranslations.INVALID_TOKEN)
          : this._i18n.t(UserTranslations.INVALID_TOKEN),
      );

    return user;
  }

  findAll(): Promise<UserDocument[]> {
    return this.userRepository.find({});
  }

  async findById(_id: string, i18n?: I18nContext): Promise<UserDocument> {
    const user: UserDocument | null = await this.userRepository.findOne({
      _id,
    });

    if (!user)
      throw new NotFoundException(
        i18n
          ? i18n.t(UserTranslations.NOT_FOUND)
          : this._i18n.t(UserTranslations.NOT_FOUND),
      );

    return user;
  }

  async findCurrent(i18n?: I18nContext): Promise<User | null> {
    const userId = (this.request as { user?: { _id: string } })?.user?._id;

    if (!userId) return null;

    const user: User = await this.findById(userId, i18n);

    return user;
  }

  create(user: User): Promise<UserDocument> {
    return this.userRepository.create(user);
  }

  async update(_id: string, entity: User): Promise<UserDocument | null> {
    await this.findById(_id);

    return this.userRepository.findOneAndUpdate({ _id }, entity);
  }
}
