import { Provider } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import {
  PropertyPostsService as PropertyPostServiceType,
  PropertyPostsService,
} from "./property-posts.service";
import { PropertyPostsRepository as PropertyPostsRepositoryType } from "../../../../infrastructure/repositories";
import { PropertyPostsRepository } from "../../../../../test/mocks";
import { PropertyPost } from "@/domain/entities";
import { getPropertyPostStub } from "../../../../../test/stubs";
import { I18nService } from "nestjs-i18n";

describe("PropertyPostsService", () => {
  let service: PropertyPostServiceType;
  let repository: PropertyPostsRepositoryType;

  const PropertyPostsRepositoryProvider: Provider = {
    provide: PropertyPostsRepositoryType,
    useClass: PropertyPostsRepository,
  };

  const PropertyPostServiceProvider: Provider = {
    provide: "IPropertyPostsService",
    useClass: PropertyPostsService,
  };

  const I18nServiceProvider: Provider = {
    provide: I18nService,
    useValue: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyPostServiceProvider,
        PropertyPostsService,
        PropertyPostsRepository,
        PropertyPostsRepositoryProvider,
        I18nServiceProvider,
      ],
    }).compile();

    service = module.get<PropertyPostServiceType>(PropertyPostsService);
    repository = module.get<PropertyPostsRepositoryType>(
      PropertyPostsRepository,
    );

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("operations", () => {
    describe("findAll", () => {
      let propertyPosts: Array<PropertyPost>;

      beforeEach(async () => {
        propertyPosts = await service.findAll();
      });

      test("then it should call find on the repository", () => {
        expect(repository.find).toHaveBeenCalledWith({});
      });

      test("then it should return two propertyPosts", () => {
        expect(propertyPosts).toEqual([
          getPropertyPostStub(),
          getPropertyPostStub(),
        ]);
      });
    });

    describe("find by id", () => {
      describe("without erros", () => {
        let propertyPost: PropertyPost;

        beforeEach(async () => {
          propertyPost = await service.findById(getPropertyPostStub()._id);
        });

        test("then it should call findOne on the repository", () => {
          expect(repository.findOne).toHaveBeenCalledWith({
            _id: getPropertyPostStub()._id,
          });
        });

        test("then it should return a propertyPost", () => {
          expect(propertyPost).toEqual(getPropertyPostStub());
        });
      });
    });

    describe("create", () => {
      let propertyPost: PropertyPost;

      beforeEach(async () => {
        propertyPost = await service.create(getPropertyPostStub());
      });

      test("then it should call create on the repository", () => {
        expect(repository.create).toHaveBeenCalledWith(getPropertyPostStub());
      });

      test("then it should return a propertyPost", () => {
        expect(propertyPost).toEqual(getPropertyPostStub());
      });
    });

    describe("update", () => {
      let propertyPost: PropertyPost | null;

      beforeEach(async () => {
        propertyPost = await service.update(
          getPropertyPostStub()._id,
          getPropertyPostStub(),
        );
      });

      test("then it should call findOneAndUpdate on the repository", () => {
        expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
          { _id: getPropertyPostStub()._id },
          getPropertyPostStub(),
        );
      });

      test("then it should return a propertyPost", () => {
        expect(propertyPost).toEqual(getPropertyPostStub());
      });
    });
  });
});
