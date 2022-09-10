import { Provider } from "@nestjs/common";
import { PropertyPostsController } from "./property-posts.controller";
import { mockResObj, PropertyPostsService } from "../../../../test/mocks";

import { PropertyPostsService as PropertyPostsServiceType } from "../../../application/services/implementations";
import { Test, TestingModule } from "@nestjs/testing";
import { PropertyPost, PropertyPostDocument } from "../../../domain/entities";
import { getPropertyPostStub } from "../../../../test/stubs";
import {
  CreatePropertyPostDto,
  UpdatePropertyPostDto,
} from "../../../infrastructure/dtos";
import { REQUEST } from "@nestjs/core";
import { DeepMocked } from "@golevelup/ts-jest";
import e, { Response } from "express";
import { PaginatedQuery } from "@/infrastructure/common/util";

describe("PropertyController", () => {
  let controller: PropertyPostsController;
  let service: PropertyPostsServiceType;

  const PropertyPostsProvider: Provider = {
    provide: "IPropertyPostsService",
    useClass: PropertyPostsService,
  };

  const RequestProvider: Provider = {
    provide: REQUEST,
    useValue: jest.fn().mockReturnValue(() => null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyPostsController],
      providers: [PropertyPostsProvider, PropertyPostsService, RequestProvider],
    }).compile();

    controller = module.get<PropertyPostsController>(PropertyPostsController);
    service = module.get<PropertyPostsServiceType>(PropertyPostsService);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    describe("when findAll is called", () => {
      let propertyPosts: PaginatedQuery<PropertyPostDocument>;

      beforeEach(async () => {
        propertyPosts = await controller.findAll({ page: 1, perPage: 10 });
      });

      test("then it should call findAll from PropertyPostsService", () => {
        expect(service.findAll).toHaveBeenCalled();
      });

      test("then it should return two property posts", () => {
        expect(propertyPosts).toEqual([
          getPropertyPostStub(),
          getPropertyPostStub(),
        ]);
      });
    });
  });

  describe("findAllFromSeller", () => {
    describe("when paginate is called", () => {
      let propertyPosts: PropertyPost[];
      const seller = "abc12345678910abc";
      const paginationQuery = {
        page: 1,
        perPage: 10,
      };

      beforeEach(async () => {
        propertyPosts = await controller.findAllFromSeller(
          seller,
          paginationQuery,
        );
      });

      test("then it should call findAllFromSeller from PropertyPostsService", () => {
        expect(service.findAllFromSeller).toHaveBeenCalledWith(
          seller,
          paginationQuery,
          undefined,
        );
      });

      test("then it should return two property posts", () => {
        expect(propertyPosts).toEqual([
          getPropertyPostStub(),
          getPropertyPostStub(),
        ]);
      });
    });
  });

  describe("findById", () => {
    describe("when findById is called", () => {
      let propertyPost: PropertyPost;

      beforeEach(async () => {
        propertyPost = await controller.findById(
          "sajdnasj32324e.3443sdfapSSL.d",
        );
      });

      test("then it should call findOne from PropertyPostsService", () => {
        expect(service.findById).toHaveBeenCalled();
      });

      test("then it should return a property post", () => {
        expect(propertyPost).toEqual(getPropertyPostStub());
      });
    });
  });

  describe("create", () => {
    describe("when create is called", () => {
      const createPropertyPostDto =
        getPropertyPostStub() as unknown as CreatePropertyPostDto;

      let responseFromRequest: Response;
      const res: DeepMocked<e.Response<unknown, Record<string, unknown>>> =
        mockResObj();

      beforeEach(async () => {
        responseFromRequest = await controller.create(
          createPropertyPostDto,
          res,
        );
      });

      test("then it should call create from PropertyPostsService", () => {
        expect(service.create).toHaveBeenCalledWith(
          createPropertyPostDto,
          undefined,
        );
      });

      test("then it should return a property post", async () => {
        expect(
          await service.create(
            createPropertyPostDto as unknown as PropertyPost,
          ),
        ).toEqual(createPropertyPostDto);
      });

      test("then it should return a response object", () => {
        expect(responseFromRequest).toBeDefined();
      });
    });
  });

  describe("update", () => {
    describe("when update is called", () => {
      const updatePropertyPostDto =
        getPropertyPostStub() as unknown as UpdatePropertyPostDto;

      let responseFromRequest: Response;
      const res: DeepMocked<e.Response<unknown, Record<string, unknown>>> =
        mockResObj();

      beforeEach(async () => {
        responseFromRequest = await controller.update(
          getPropertyPostStub()._id,
          updatePropertyPostDto,
          res,
        );
      });

      test("then it should call update from PropertyPostsService", () => {
        expect(service.update).toHaveBeenCalledWith(
          getPropertyPostStub()._id,
          updatePropertyPostDto,
          undefined,
        );
      });

      test("then it should return a property post", async () => {
        const propertyPost = await service.update(
          getPropertyPostStub()._id,
          updatePropertyPostDto as unknown as PropertyPost,
        );

        expect(propertyPost).toEqual(getPropertyPostStub());
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
          getPropertyPostStub()._id,
          res,
        );
      });

      test("then it should call delete from PropertyPostsService", () => {
        expect(service.delete).toHaveBeenCalledWith(
          getPropertyPostStub()._id,
          undefined,
        );
      });

      test("then it should return a property post", async () => {
        const propertyPost = await service.delete(getPropertyPostStub()._id);

        expect(propertyPost).toEqual(true);
      });

      test("then it should return a response object", () => {
        expect(responseFromRequest).toBeDefined();
      });
    });
  });
});
