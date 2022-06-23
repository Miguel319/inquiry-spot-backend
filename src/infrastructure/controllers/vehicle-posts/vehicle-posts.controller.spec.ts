import { Provider } from "@nestjs/common";
import { VehiclePostsController } from "./vehicle-posts.controller";
import { mockResObj, VehiclePostsService } from "../../../../test/mocks";

import { VehiclePostsService as VehiclePostsServiceType } from "../../../application/services/implementations";
import { Test, TestingModule } from "@nestjs/testing";
import { VehiclePost } from "../../../domain/entities";
import { getVehiclePostStub } from "../../../../test/stubs";
import {
  CreateVehiclePostDto,
  UpdateVehiclePostDto,
} from "../../../infrastructure/dtos";
import { REQUEST } from "@nestjs/core";
import { DeepMocked } from "@golevelup/ts-jest";
import e, { Response } from "express";

describe("VehicleController", () => {
  let controller: VehiclePostsController;
  let service: VehiclePostsServiceType;

  const VehiclePostsProvider: Provider = {
    provide: "IVehiclePostsService",
    useClass: VehiclePostsService,
  };

  const RequestProvider: Provider = {
    provide: REQUEST,
    useValue: jest.fn().mockReturnValue(() => null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclePostsController],
      providers: [VehiclePostsProvider, VehiclePostsService, RequestProvider],
    }).compile();

    controller = module.get<VehiclePostsController>(VehiclePostsController);
    service = module.get<VehiclePostsServiceType>(VehiclePostsService);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    describe("when findAll is called", () => {
      let vehiclePosts: VehiclePost[];

      beforeEach(async () => {
        vehiclePosts = await controller.findAll({ page: 1, perPage: 10 });
      });

      test("then it should call findAll from VehiclePostsService", () => {
        expect(service.findAll).toHaveBeenCalled();
      });

      test("then it should return two vehicle posts", () => {
        expect(vehiclePosts).toEqual([
          getVehiclePostStub(),
          getVehiclePostStub(),
        ]);
      });
    });
  });

  describe("findById", () => {
    describe("when findById is called", () => {
      let vehiclePost: VehiclePost;

      beforeEach(async () => {
        vehiclePost = await controller.findById(
          "sajdnasj32324e.3443sdfapSSL.d",
        );
      });

      test("then it should call findOne from VehiclePostsService", () => {
        expect(service.findById).toHaveBeenCalled();
      });

      test("then it should return a vehicle post", () => {
        expect(vehiclePost).toEqual(getVehiclePostStub());
      });
    });
  });

  describe("create", () => {
    describe("when create is called", () => {
      const createVehiclePostDto =
        getVehiclePostStub() as unknown as CreateVehiclePostDto;

      let responseFromRequest: Response;
      const res: DeepMocked<e.Response<unknown, Record<string, unknown>>> =
        mockResObj();

      beforeEach(async () => {
        responseFromRequest = await controller.create(
          createVehiclePostDto,
          res,
        );
      });

      test("then it should call create from VehiclePostsService", () => {
        expect(service.create).toHaveBeenCalledWith(createVehiclePostDto);
      });

      test("then it should return a vehicle post", async () => {
        expect(
          await service.create(createVehiclePostDto as VehiclePost),
        ).toEqual(createVehiclePostDto);
      });

      test("then it should return a response object", () => {
        expect(responseFromRequest).toBeDefined();
      });
    });
  });

  describe("update", () => {
    describe("when update is called", () => {
      const updateVehiclePostDto =
        getVehiclePostStub() as unknown as UpdateVehiclePostDto;

      let responseFromRequest: Response;
      const res: DeepMocked<e.Response<unknown, Record<string, unknown>>> =
        mockResObj();

      beforeEach(async () => {
        responseFromRequest = await controller.update(
          getVehiclePostStub()._id,
          updateVehiclePostDto,
          res,
        );
      });

      test("then it should call update from VehiclePostsService", () => {
        expect(service.update).toHaveBeenCalledWith(
          getVehiclePostStub()._id,
          updateVehiclePostDto,
        );
      });

      test("then it should return a vehicle post", async () => {
        const vehiclePost = await service.update(
          getVehiclePostStub()._id,
          updateVehiclePostDto as VehiclePost,
        );

        expect(vehiclePost).toEqual(getVehiclePostStub());
      });

      test("then it should return a response object", () => {
        expect(responseFromRequest).toBeDefined();
      });
    });
  });

  describe("delete", () => {
    describe("when delete is called", () => {
      let responseFromRequest: Response;
      const res: DeepMocked<e.Response<unknown, Record<string, unknown>>> =
        mockResObj();

      beforeEach(async () => {
        responseFromRequest = await controller.delete(
          getVehiclePostStub()._id,
          res,
        );
      });

      test("then it should call delete from VehiclePostsService", () => {
        console.log(service);

        expect(service.delete).toHaveBeenCalledWith(getVehiclePostStub()._id);
      });

      test("then it should return a vehicle post", async () => {
        const vehiclePost = await service.delete(getVehiclePostStub()._id);

        expect(vehiclePost).toEqual(true);
      });

      test("then it should return a response object", () => {
        expect(responseFromRequest).toBeDefined();
      });
    });
  });

  describe("findFromSeller", () => {
    describe("when findFromSeller is called", () => {
      const vehiclePostId = getVehiclePostStub()._id;
      const sellerId = "123456789012345678abc123";

      beforeEach(async () => {
        await controller.findFromSeller(vehiclePostId, sellerId);
      });

      test("then it should call findFromSeller from VehiclePostsService", () => {
        expect(service.findFromSeller).toBeCalled();
      });

      test("then the service should return a vehicle post", async () => {
        const vehiclePost = await service.findFromSeller(
          vehiclePostId,
          sellerId,
        );

        expect(vehiclePost).toStrictEqual(getVehiclePostStub());
      });
    });
  });
});
