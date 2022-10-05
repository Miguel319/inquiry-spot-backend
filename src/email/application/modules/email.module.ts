import { LoggerService } from "@/common/infrastructure/logger";
import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "../../../user/application/modules/users.module";
import { EmailsRepository } from "@/email/infrastructure/persistence/repositories";
import { EmailSchema } from "@/email/infrastructure/persistence/schemas";
import { EmailsService } from "../services/implementation";
import { EmailsController } from "@/user/presentation/controllers";

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
  controllers: [EmailsController],
})
export class EmailsModule {}
