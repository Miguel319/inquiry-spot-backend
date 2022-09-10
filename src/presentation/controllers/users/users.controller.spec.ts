import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";

import { getUserStub } from "../../../../test/stubs";
import { Provider } from "@nestjs/common";

import { User, UserDocument } from "../../../domain/entities";
import { UsersService as UserServiceType } from "../../../application/services/implementations";

import { UsersService } from "../../../../test/mocks";
import { PaginatedQuery } from "@/common/infrastructure/util";

describe("UsersController", () => {
  let controller: UsersController;
  let service: UserServiceType;

  const UserUseCaseProvider: Provider = {
    provide: "IUsersService",
    useClass: UsersService,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserUseCaseProvider, UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UserServiceType>(UsersService);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    describe("when findAll is called", () => {
      let users: User[] | PaginatedQuery<UserDocument>;

      beforeEach(async () => {
        users = await controller.findAll();
      });

      test("then it should call findAll from UsersService", () => {
        expect(service.findAll).toHaveBeenCalled();
      });

      test("then it should return two users", () => {
        expect(users).toEqual([getUserStub(), getUserStub()]);
      });
    });
  });

  describe("findUser", () => {
    describe("when findById is called", () => {
      let user: User;

      beforeEach(async () => {
        user = await controller.findById(getUserStub()._id);
      });

      test.skip("then it should call findById from UseService", () => {
        expect(service.findById(user._id)).toHaveBeenCalled();
      });

      test("then it should return a user", () => {
        expect(user).toEqual(getUserStub());
      });
    });
  });
});
