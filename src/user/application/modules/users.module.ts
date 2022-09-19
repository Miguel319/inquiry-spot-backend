import { UsersRepository } from "@/user/infrastructure/persistence/repositories/user";
import { UserSchema } from "@/user/infrastructure/persistence/schemas";
import { UsersController } from "@/user/presentation/users";
import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "../services/implementations";

const UserUseCaseProvider: Provider = {
  provide: "IUsersService",
  useClass: UsersService,
};

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "User",
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersRepository, UserUseCaseProvider, UsersService],
  exports: [UsersRepository, UserUseCaseProvider, UsersService],
})
export class UsersModule {}
