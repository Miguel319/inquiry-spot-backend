import { UserSchema } from "@/domain/entities";
import { SellersController } from "@/infrastructure/controllers/sellers/sellers.controller";
import { UsersRepository } from "@/infrastructure/repositories";
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
