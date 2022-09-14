import { LoggerService } from "../../../../common/infrastructure/logger";
import { Provider } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { EmailsService } from "./email.service";
import { EmailsRepository as EmailsRepositoryType } from "@/email/infrastructure/persistence/repositories";
import { EmailsRepository } from "../../../../../test/mocks";
import { I18nService } from "nestjs-i18n";
import { UsersService } from "@/user/application/services/implementations";

describe("EmailsService", () => {
  let service: EmailsService;
  let logger: LoggerService;
  let usersServiceM: UsersService;
  let repository: EmailsRepositoryType;

  const LoggerServiceProvider: Provider = {
    provide: "ILogger",
    useValue: jest.fn().mockImplementation(),
  };

  const EmailsRepositoryProvider: Provider = {
    provide: EmailsRepositoryType,
    useClass: EmailsRepository,
  };

  const usersService = {
    findOne: jest.fn(),
    find: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const I18nServiceProvider: Provider = {
    provide: I18nService,
    useValue: jest.fn(),
  };

  const UserUseCaseProvider: Provider = {
    provide: "IUsersService",
    useValue: usersService,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailsService,
        LoggerServiceProvider,
        UserUseCaseProvider,
        LoggerService,
        EmailsRepository,
        EmailsRepositoryProvider,
        I18nServiceProvider,
      ],
    }).compile();

    repository = module.get<EmailsRepositoryType>(EmailsRepository);
    service = module.get<EmailsService>(EmailsService);
    logger = module.get<LoggerService>(LoggerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    repository;
    logger;
    usersService;
    usersServiceM;
  });
});
