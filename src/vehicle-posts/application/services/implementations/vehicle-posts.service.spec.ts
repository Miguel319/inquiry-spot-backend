import { Provider } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import {
  VehiclePostsService as VehiclePostServiceType,
  VehiclePostsService,
} from "./vehicle-posts.service";
import { VehiclePostsRepository as VehiclePostsRepositoryType } from "../../../infrastructure/persistence/repositories";
import {
  UsersRepository,
  VehiclePostsRepository,
} from "../../../../../test/mocks";
import { VehiclePost, VehiclePostDocument } from "@/domain/entities";
import { getVehiclePostStub } from "../../../../../test/stubs";
import { I18nService } from "nestjs-i18n";
import { UsersRepository as UsersRepositoryType } from "@/infrastructure/repositories";

import { UsersService } from "../../../../application/services/implementations/users";
import { PaginatedQuery } from "@/common/infrastructure/util";

describe.skip("VehiclePostsService", () => {
  let service: VehiclePostServiceType;
  let repository: VehiclePostsRepositoryType;

  const VehiclePostsRepositoryProvider: Provider = {
    provide: VehiclePostsRepositoryType,
    useClass: VehiclePostsRepository,
  };

  const UsersRepositoryProvider: Provider = {
    provide: UsersRepositoryType,
    useClass: UsersRepository,
  };

  const UserServiceProvider: Provider = {
    provide: "IUsersService",
    useClass: UsersService,
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
        UsersRepositoryProvider,
        UsersRepository,
        VehiclePostsRepository,
        UserServiceProvider,
        UsersService,
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
      let vehiclePosts: PaginatedQuery<VehiclePostDocument>;

      beforeEach(async () => {
        vehiclePosts = await service.findAll({ page: 1, perPage: 10 });
      });

      test.skip("then it should call find on the repository", () => {
        expect(repository.paginate).toHaveBeenCalled();
      });

      test.skip("then it should return two vehiclePosts", () => {
        expect(vehiclePosts).toEqual([
          getVehiclePostStub(),
          getVehiclePostStub(),
        ]);
      });
    });

    describe("find by id", () => {
      describe("without errors", () => {
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
