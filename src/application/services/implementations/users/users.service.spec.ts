import { Provider } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { UsersService as UserServiceType, UsersService } from "./users.service";
import { UsersRepository as UsersRepositoryType } from "../../../../infrastructure/repositories";
import { UsersRepository } from "../../../../../test/mocks";
import { User } from "@/domain/entities";
import { getUserStub } from "../../../../../test/stubs";
import { REQUEST } from "@nestjs/core";

describe("UsersService", () => {
  let service: UserServiceType;
  let repository: UsersRepositoryType;

  const UsersRepositoryProvider: Provider = {
    provide: UsersRepositoryType,
    useClass: UsersRepository,
  };

  const UserServiceProvider: Provider = {
    provide: "IUsersService",
    useClass: UsersService,
  };

  const RequestProvider: Provider = {
    provide: REQUEST,
    useValue: jest.fn().mockReturnValue(() => null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserServiceProvider,
        UsersService,
        UsersRepository,
        UsersRepositoryProvider,
        RequestProvider,
      ],
    }).compile();

    service = module.get<UserServiceType>(UsersService);
    repository = module.get<UsersRepositoryType>(UsersRepository);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("operations", () => {
    describe("findAll", () => {
      let users: Array<User>;

      beforeEach(async () => {
        users = await service.findAll();
      });

      test("then it should call find on the repository", () => {
        expect(repository.find).toHaveBeenCalledWith({});
      });

      test("then it should return two users", () => {
        expect(users).toEqual([getUserStub(), getUserStub()]);
      });
    });

    describe("find by id", () => {
      describe("without erros", () => {
        let user: User;

        beforeEach(async () => {
          user = await service.findById(getUserStub()._id);
        });

        test("then it should call findOne on the repository", () => {
          expect(repository.findOne).toHaveBeenCalledWith({
            _id: getUserStub()._id,
          });
        });

        test("then it should return a user", () => {
          expect(user).toEqual(getUserStub());
        });
      });
    });

    describe("find by email", () => {
      let user: User;

      beforeEach(async () => {
        user = await service.findByEmail(getUserStub().email);
      });

      test("then it should call findOne on the repository", () => {
        expect(repository.findOne).toHaveBeenCalled();
      });

      test("then it should return a user", () => {
        expect(user).toEqual(getUserStub());
      });
    });

    describe("find current", () => {
      let user: User | null;

      beforeEach(async () => {
        user = await service.findCurrent();
      });

      test("it returns null", () => {
        expect(user).toBe(null);
      });
    });

    describe("create", () => {
      let user: User;

      beforeEach(async () => {
        user = await service.create(getUserStub());
      });

      test("then it should call create on the repository", () => {
        expect(repository.create).toHaveBeenCalledWith(getUserStub());
      });

      test("then it should return a user", () => {
        expect(user).toEqual(getUserStub());
      });
    });

    describe("update", () => {
      let user: User | null;

      beforeEach(async () => {
        user = await service.update(getUserStub()._id, getUserStub());
      });

      test("then it should call findOneAndUpdate on the repository", () => {
        expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
          { _id: getUserStub()._id },
          getUserStub(),
        );
      });

      test("then it should return a user", () => {
        expect(user).toEqual(getUserStub());
      });
    });
  });
});
