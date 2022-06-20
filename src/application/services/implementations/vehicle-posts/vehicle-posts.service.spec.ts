import { Provider } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import {
  VehiclePostsService as VehiclePostServiceType,
  VehiclePostsService,
} from "./vehicle-posts.service";
import { VehiclePostsRepository as VehiclePostsRepositoryType } from "../../../../infrastructure/repositories";
import { VehiclePostsRepository } from "../../../../../test/mocks";
import { VehiclePost } from "@/domain/entities";
import { getVehiclePostStub } from "../../../../../test/stubs";
import { I18nService } from "nestjs-i18n";

describe("VehiclePostsService", () => {
  let service: VehiclePostServiceType;
  let repository: VehiclePostsRepositoryType;

  const VehiclePostsRepositoryProvider: Provider = {
    provide: VehiclePostsRepositoryType,
    useClass: VehiclePostsRepository,
  };

  const VehiclePostServiceProvider: Provider = {
    provide: "IVehiclePostsService",
    useClass: VehiclePostsService,
  };

  const I18nServiceProvider: Provider = {
    provide: I18nService,
    useValue: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclePostServiceProvider,
        VehiclePostsService,
        VehiclePostsRepository,
        VehiclePostsRepositoryProvider,
        I18nServiceProvider,
      ],
    }).compile();

    service = module.get<VehiclePostServiceType>(VehiclePostsService);
    repository = module.get<VehiclePostsRepositoryType>(VehiclePostsRepository);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("operations", () => {
    describe("findAll", () => {
      let vehiclePosts: Array<VehiclePost>;

      beforeEach(async () => {
        vehiclePosts = await service.findAll();
      });

      test("then it should call find on the repository", () => {
        expect(repository.find).toHaveBeenCalledWith({});
      });

      test("then it should return two vehiclePosts", () => {
        expect(vehiclePosts).toEqual([
          getVehiclePostStub(),
          getVehiclePostStub(),
        ]);
      });
    });

    describe("find by id", () => {
      describe("without erros", () => {
        let vehiclePost: VehiclePost;

        beforeEach(async () => {
          vehiclePost = await service.findById(getVehiclePostStub()._id);
        });

        test("then it should call findOne on the repository", () => {
          expect(repository.findOne).toHaveBeenCalledWith({
            _id: getVehiclePostStub()._id,
          });
        });

        test("then it should return a vehiclePost", () => {
          expect(vehiclePost).toEqual(getVehiclePostStub());
        });
      });
    });

    describe("create", () => {
      let vehiclePost: VehiclePost;

      beforeEach(async () => {
        vehiclePost = await service.create(getVehiclePostStub());
      });

      test("then it should call create on the repository", () => {
        expect(repository.create).toHaveBeenCalledWith(getVehiclePostStub());
      });

      test("then it should return a vehiclePost", () => {
        expect(vehiclePost).toEqual(getVehiclePostStub());
      });
    });

    describe("update", () => {
      let vehiclePost: VehiclePost | null;

      beforeEach(async () => {
        vehiclePost = await service.update(
          getVehiclePostStub()._id,
          getVehiclePostStub(),
        );
      });

      test("then it should call findOneAndUpdate on the repository", () => {
        expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
          { _id: getVehiclePostStub()._id },
          getVehiclePostStub(),
        );
      });

      test("then it should return a vehiclePost", () => {
        expect(vehiclePost).toEqual(getVehiclePostStub());
      });
    });
  });
});
