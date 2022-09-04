import { EmailSchema } from "@/domain/entities";
import { LoggerService } from "@/infrastructure/logger";
import { EmailsRepository } from "@/infrastructure/repositories";
import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmailsService } from "../services/implementations";
import { UsersModule } from "./users.module";

const EmailUseCaseProvider: Provider = {
  provide: "IEmailsService",
  useClass: EmailsService,
};

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: "Email",
        schema: EmailSchema,
      },
    ]),
  ],
  providers: [
    EmailsRepository,
    EmailUseCaseProvider,
    EmailsService,
    LoggerService,
  ],
  exports: [EmailsRepository, EmailsService, EmailUseCaseProvider],
})
export class EmailsModule {}
