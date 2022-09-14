import { SellersController } from "@/presentation/controllers/sellers/sellers.controller";
import { UsersRepository } from "@/user/infrastructure/persistence/repositories";
import { UserSchema } from "@/user/infrastructure/persistence/schemas";
import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SellersService } from "../services/implementations";

const UserUseCaseProvider: Provider = {
  provide: "ISellersService",
  useClass: SellersService,
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
  controllers: [SellersController],
  providers: [UsersRepository, UserUseCaseProvider, SellersService],
  exports: [UsersRepository, UserUseCaseProvider, SellersService],
})
export class SellersModule {}
