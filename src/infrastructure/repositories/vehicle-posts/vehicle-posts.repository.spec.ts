import { VehiclePost } from "../../../domain/entities";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { FilterQuery } from "mongoose";
import { VehiclePostModel } from "../../../../test/support";

import { getVehiclePostStub } from "../../../../test/stubs";
import { VehiclePostsRepository } from "./vehicle-post.repository";

describe("VehiclePostsRepository", () => {
  let vehiclePostsRepository: VehiclePostsRepository;

  describe("find operations", () => {
    let vehiclePostModel: VehiclePostModel;
    let vehiclePostFilterQuery: FilterQuery<VehiclePost>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          VehiclePostsRepository,
          {
            provide: getModelToken(VehiclePost.name),
            useClass: VehiclePostModel,
          },
        ],
      }).compile();

      vehiclePostsRepository = moduleRef.get<VehiclePostsRepository>(VehiclePostsRepository);
      vehiclePostModel = moduleRef.get<VehiclePostModel>(getModelToken(VehiclePost.name));

      vehiclePostFilterQuery = {
        _id: getVehiclePostStub()._id,
      };

      jest.clearAllMocks();
    });

    describe("findOne", () => {
      describe("when findOne is called", () => {
        let vehiclePost: VehiclePost | null;

        beforeEach(async () => {
          jest.spyOn(vehiclePostModel, "findOne");

          vehiclePost = await vehiclePostsRepository.findOne(vehiclePostFilterQuery);
        });

        test("then it should call the vehiclePostModel", () => {
          expect(vehiclePostModel.findOne).toHaveBeenCalledWith(vehiclePostFilterQuery, {
            __v: 0,
          });
        });

        test("then it should return a vehiclePost", () => {
          expect(vehiclePost).toEqual(getVehiclePostStub());
        });
      });
    });

    describe("find", () => {
      describe("when find is called", () => {
        let vehiclePosts: Array<VehiclePost>;

        beforeEach(async () => {
          jest.spyOn(vehiclePostModel, "find");

          vehiclePosts = await vehiclePostsRepository.find({});
        });

        test("then it should call the vehiclePostModel", () => {
          expect(vehiclePostModel.find).toHaveBeenCalledWith({}, { __v: 0 });
        });

        test("then it should return a vehiclePost", () => {
          expect(vehiclePosts).toEqual([getVehiclePostStub(), getVehiclePostStub()]);
        });
      });
    });

    describe("findOneAndUpdate", () => {
      describe("when findOneAndUpdate is called", () => {
        let vehiclePost: VehiclePost | null;

        beforeEach(async () => {
          jest.spyOn(vehiclePostModel, "findOneAndUpdate");

          vehiclePost = await vehiclePostsRepository.findOneAndUpdate(
            vehiclePostFilterQuery,
            getVehiclePostStub(),
          );
        });

        test("then it should call the vehiclePostModel", () => {
          expect(vehiclePostModel.findOneAndUpdate).toHaveBeenCalledWith(
            vehiclePostFilterQuery,
            getVehiclePostStub(),
            { new: true },
          );
        });

        test("then it should return a vehiclePost", () => {
          expect(vehiclePost).toEqual(getVehiclePostStub());
        });
      });
    });

    describe("deleteOne", () => {
      describe("when deleteOne is called", () => {
        let result: boolean = true;

        beforeEach(async () => {
          jest.spyOn(vehiclePostModel, "deleteOne");

          result = await vehiclePostsRepository.deleteOne(vehiclePostFilterQuery);
        });

        test("then it should call the vehiclePostModel", () => {
          expect(vehiclePostModel.deleteOne).toHaveBeenCalledWith(vehiclePostFilterQuery);
        });

        test("then it should return false", () => {
          expect(result).toEqual(false);
        });
      });
    });

    describe("deleteMany", () => {
      describe("when deleteMany is called", () => {
        let result: boolean = true;

        beforeEach(async () => {
          jest.spyOn(vehiclePostModel, "deleteMany");

          result = await vehiclePostsRepository.deleteMany(vehiclePostFilterQuery);
        });

        test("then it should call the vehiclePostModel", () => {
          expect(vehiclePostModel.deleteMany).toHaveBeenCalledWith(vehiclePostFilterQuery);
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
          VehiclePostsRepository,
          {
            provide: getModelToken(VehiclePost.name),
            useValue: VehiclePostModel,
          },
        ],
      }).compile();

      vehiclePostsRepository = moduleRef.get<VehiclePostsRepository>(VehiclePostsRepository);
    });

    describe("create", () => {
      describe("when create is called", () => {
        let vehiclePost: VehiclePost;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(VehiclePostModel.prototype, "save");
          constructorSpy = jest.spyOn(VehiclePostModel.prototype, "constructorSpy");
          vehiclePost = await vehiclePostsRepository.create(getVehiclePostStub());
        });

        test("then it should call the vehiclePostModel", () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(getVehiclePostStub());
        });

        test("then it should return a vehiclePost", () => {
          expect(vehiclePost).toEqual(getVehiclePostStub());
        });
      });
    });
  });
});
