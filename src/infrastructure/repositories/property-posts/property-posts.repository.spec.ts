import { PropertyPost } from "../../../domain/entities";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { FilterQuery } from "mongoose";
import { PropertyPostModel } from "../../../../test/support";
import { PropertyPostsRepository } from "./property-posts.repository";

import { getPropertyPostStub } from "../../../../test/stubs";

describe("PropertyPostsRepository", () => {
  let propertyPostsRepository: PropertyPostsRepository;

  describe("find operations", () => {
    let propertyPostModel: PropertyPostModel;
    let propertyPostFilterQuery: FilterQuery<PropertyPost>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          PropertyPostsRepository,
          {
            provide: getModelToken(PropertyPost.name),
            useClass: PropertyPostModel,
          },
        ],
      }).compile();

      propertyPostsRepository = moduleRef.get<PropertyPostsRepository>(
        PropertyPostsRepository,
      );
      propertyPostModel = moduleRef.get<PropertyPostModel>(
        getModelToken(PropertyPost.name),
      );

      propertyPostFilterQuery = {
        _id: getPropertyPostStub()._id,
      };

      jest.clearAllMocks();
    });

    describe("findOne", () => {
      describe("when findOne is called", () => {
        let propertyPost: PropertyPost | null;

        beforeEach(async () => {
          jest.spyOn(propertyPostModel, "findOne");

          propertyPost = await propertyPostsRepository.findOne(
            propertyPostFilterQuery,
          );
        });

        test("then it should call the propertyPostModel", () => {
          expect(propertyPostModel.findOne).toHaveBeenCalledWith(
            propertyPostFilterQuery,
            {
              __v: 0,
            },
          );
        });

        test("then it should return a propertyPost", () => {
          expect(propertyPost).toEqual(getPropertyPostStub());
        });
      });
    });

    describe("find", () => {
      describe("when find is called", () => {
        let propertyPosts: Array<PropertyPost>;

        beforeEach(async () => {
          jest.spyOn(propertyPostModel, "find");

          propertyPosts = await propertyPostsRepository.find({});
        });

        test("then it should call the propertyPostModel", () => {
          expect(propertyPostModel.find).toHaveBeenCalledWith({}, { __v: 0 });
        });

        test("then it should return a propertyPost", () => {
          expect(propertyPosts).toEqual([
            getPropertyPostStub(),
            getPropertyPostStub(),
          ]);
        });
      });
    });

    describe("findOneAndUpdate", () => {
      describe("when findOneAndUpdate is called", () => {
        let propertyPost: PropertyPost | null;

        beforeEach(async () => {
          jest.spyOn(propertyPostModel, "findOneAndUpdate");

          propertyPost = await propertyPostsRepository.findOneAndUpdate(
            propertyPostFilterQuery,
            getPropertyPostStub(),
          );
        });

        test("then it should call the propertyPostModel", () => {
          expect(propertyPostModel.findOneAndUpdate).toHaveBeenCalledWith(
            propertyPostFilterQuery,
            getPropertyPostStub(),
            { new: true },
          );
        });

        test("then it should return a propertyPost", () => {
          expect(propertyPost).toEqual(getPropertyPostStub());
        });
      });
    });

    describe("deleteOne", () => {
      describe("when deleteOne is called", () => {
        let result = true;

        beforeEach(async () => {
          jest.spyOn(propertyPostModel, "deleteOne");

          result = await propertyPostsRepository.deleteOne(
            propertyPostFilterQuery,
          );
        });

        test("then it should call the propertyPostModel", () => {
          expect(propertyPostModel.deleteOne).toHaveBeenCalledWith(
            propertyPostFilterQuery,
          );
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
          jest.spyOn(propertyPostModel, "deleteMany");

          result = await propertyPostsRepository.deleteMany(
            propertyPostFilterQuery,
          );
        });

        test("then it should call the propertyPostModel", () => {
          expect(propertyPostModel.deleteMany).toHaveBeenCalledWith(
            propertyPostFilterQuery,
          );
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
          PropertyPostsRepository,
          {
            provide: getModelToken(PropertyPost.name),
            useValue: PropertyPostModel,
          },
        ],
      }).compile();

      propertyPostsRepository = moduleRef.get<PropertyPostsRepository>(
        PropertyPostsRepository,
      );
    });

    describe("create", () => {
      describe("when create is called", () => {
        let propertyPost: PropertyPost;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(PropertyPostModel.prototype, "save");
          constructorSpy = jest.spyOn(
            PropertyPostModel.prototype,
            "constructorSpy",
          );
          propertyPost = await propertyPostsRepository.create(
            getPropertyPostStub(),
          );
        });

        test("then it should call the propertyPostModel", () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(getPropertyPostStub());
        });

        test("then it should return a propertyPost", () => {
          expect(propertyPost).toEqual(getPropertyPostStub());
        });
      });
    });
  });
});
