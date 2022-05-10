import { Provider } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { JwtService as JwtServiceType } from "@nestjs/jwt";

import { JwtService } from "../../../../../test/mocks";
import { AuthService } from "./auth.service";
import bcrypt from "bcrypt";
import { getUserStub } from "../../../../../test/stubs";
import { IAuthResult } from "../../contracts";
// import { EmailsService } from "../email/email.service";

jest.mock("bcrypt");
jest.mock("@nestjs/jwt");

describe("AuthService", () => {
  let authService: AuthService;
  let bcryptCompare: jest.Mock;

  let emailsService = {
    sendResetPasswordEmail: jest.fn(),
    send: jest.fn(),
  };

  let jwtService = {
    sign: jest.fn(),
  };

  const usersService = {
    findOne: jest.fn(),
    find: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const AuthServiceProvider: Provider = {
    provide: "IAuthService",
    useValue: AuthService,
  };

  const EmailServiceProvider: Provider = {
    provide: "IEmailsService",
    useValue: emailsService,
  };

  const UsersServiceProvider: Provider = {
    provide: "IUsersService",
    useValue: usersService,
  };

  const JwtServiceProvider: Provider = {
    provide: JwtServiceType,
    useValue: {
      sign: jest.fn(),
    },
  };

  beforeEach(async () => {
    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersServiceProvider,
        AuthServiceProvider,
        EmailServiceProvider,
        JwtServiceProvider,
        JwtService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe("signIn", () => {
    test("an error is thrown when entering an invalid password", async () => {
      usersService.findByEmail.mockReturnValue(getUserStub());

      bcryptCompare.mockResolvedValue(false);

      try {
        await authService.signIn("abc@gmail.com", "ABCdefg23");
      } catch (exception) {
        expect(exception.message).toEqual("Invalid credentials.");
      }
    });

    test("an error is thrown when entering an invalid email", async () => {
      usersService.findByEmail.mockRejectedValue("Invalid credentials.");

      try {
        await authService.signIn("abcdef@gmail.com", "ABCdefg23");
      } catch (exception) {
        expect(exception).toEqual("Invalid credentials.");
      }
    });

    describe("when signIn is called", () => {
      let authResult: IAuthResult;

      beforeEach(async () => {
        usersService.findByEmail.mockResolvedValue(() => getUserStub());

        bcryptCompare.mockResolvedValue(true);

        authResult = await authService.signIn("abc@gmail.com", "Hello World");
      });

      test("then it should call findByEmail on the UsersService with correct args", () => {
        authResult;
        jwtService;

        expect(usersService.findByEmail).toHaveBeenCalledWith(
          "abc@gmail.com",
          true,
        );
      });
    });
  });
});
