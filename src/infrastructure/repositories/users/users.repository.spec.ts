import { User } from "../../../domain/entities";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { FilterQuery } from "mongoose";
import { UserModel } from "../../../../test/support";
import { UsersRepository } from "./users.repository";

import { getUserStub } from "../../../../test/stubs";

describe("UsersRepository", () => {
  let usersRepository: UsersRepository;

  describe("find operations", () => {
    let userModel: UserModel;
    let userFilterQuery: FilterQuery<User>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersRepository,
          {
            provide: getModelToken(User.name),
            useClass: UserModel,
          },
        ],
      }).compile();

      usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
      userModel = moduleRef.get<UserModel>(getModelToken(User.name));

      userFilterQuery = {
        _id: getUserStub()._id,
      };

      jest.clearAllMocks();
    });

    describe("findOne", () => {
      describe("when findOne is called", () => {
        let user: User | null;

        beforeEach(async () => {
          jest.spyOn(userModel, "findOne");

          user = await usersRepository.findOne(userFilterQuery);
        });

        test("then it should call the userModel", () => {
          expect(userModel.findOne).toHaveBeenCalledWith(userFilterQuery, {
            __v: 0,
          });
        });

        test("then it should return a user", () => {
          expect(user).toEqual(getUserStub());
        });
      });
    });

    describe("find", () => {
      describe("when find is called", () => {
        let users: Array<User>;

        beforeEach(async () => {
          jest.spyOn(userModel, "find");

          users = await usersRepository.find({});
        });

        test("then it should call the userModel", () => {
          expect(userModel.find).toHaveBeenCalledWith({}, { __v: 0 });
        });

        test("then it should return a user", () => {
          expect(users).toEqual([getUserStub(), getUserStub()]);
        });
      });
    });

    describe("findOneAndUpdate", () => {
      describe("when findOneAndUpdate is called", () => {
        let user: User | null;

        beforeEach(async () => {
          jest.spyOn(userModel, "findOneAndUpdate");

          user = await usersRepository.findOneAndUpdate(
            userFilterQuery,
            getUserStub(),
          );
        });

        test("then it should call the userModel", () => {
          expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
            userFilterQuery,
            getUserStub(),
            { new: true },
          );
        });

        test("then it should return a user", () => {
          expect(user).toEqual(getUserStub());
        });
      });
    });

    describe("deleteOne", () => {
      describe("when deleteOne is called", () => {
        let result = true;

        beforeEach(async () => {
          jest.spyOn(userModel, "deleteOne");

          result = await usersRepository.deleteOne(userFilterQuery);
        });

        test("then it should call the userModel", () => {
          expect(userModel.deleteOne).toHaveBeenCalledWith(userFilterQuery);
        });

        test("then it should return false", () => {
          expect(result).toEqual(false);
        });
      });
    });

    describe("deleteMany", () => {
      describe("when deleteMany is called", () => {
        let result = true;

        beforeEach(async () => {
          jest.spyOn(userModel, "deleteMany");

          result = await usersRepository.deleteMany(userFilterQuery);
        });

        test("then it should call the userModel", () => {
          expect(userModel.deleteMany).toHaveBeenCalledWith(userFilterQuery);
        });

        test("then it should return false", () => {
          expect(result).toEqual(false);
        });
      });
    });
  });

  describe("create operations", () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersRepository,
          {
            provide: getModelToken(User.name),
            useValue: UserModel,
          },
        ],
      }).compile();

      usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    });

    describe("create", () => {
      describe("when create is called", () => {
        let user: User;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(UserModel.prototype, "save");
          constructorSpy = jest.spyOn(UserModel.prototype, "constructorSpy");
          user = await usersRepository.create(getUserStub());
        });

        test("then it should call the userModel", () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(getUserStub());
        });

        test("then it should return a user", () => {
          expect(user).toEqual(getUserStub());
        });
      });
    });
  });
});
