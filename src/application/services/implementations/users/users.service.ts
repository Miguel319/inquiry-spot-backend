import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "@nestjs/common";
import { User } from "@/domain/entities";
import { UsersRepository } from "../../../../infrastructure/repositories";
import { IUsersService } from "../../contracts";

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async findByEmail(email: string, signIn = false): Promise<User> {
    let user: User;

    if (signIn) {
      user = (await this.userRepository.findOne(
        { email },
        {},
        { projection: "+password name email" },
      )) as User;
    } else {
      user = (await this.userRepository.findOne({ email }, {})) as User;
    }

    if (signIn && !user) throw new NotFoundException("Invalid credentials.");

    return user;
  }

  async findByToken(resetPasswordToken: string): Promise<User> {
    const user = await this.userRepository.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) throw new BadRequestException("Invalid token.");

    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find({});

    return users;
  }

  async findById(_id: string): Promise<User> {
    const user: User | null = await this.userRepository.findOne({ _id });

    if (!user) throw new NotFoundException("User not found.");

    return user;
  }

  async findCurrent(): Promise<User | null> {
    const userId = (this.request as { user?: { _id: string } })?.user?._id;

    if (!userId) return null;

    const user: User = await this.findById(userId);

    return user;
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  async update(_id: string, entity: User): Promise<User | null> {
    await this.findById(_id);

    return await this.userRepository.findOneAndUpdate({ _id }, entity);
  }
}
