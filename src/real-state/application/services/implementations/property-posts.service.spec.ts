// import { Provider } from "@nestjs/common";
// import { Test, TestingModule } from "@nestjs/testing";
// import {
//   PropertyPostsService as PropertyPostServiceType,
//   PropertyPostsService,
// } from "./property-posts.service";
// import { PropertyPostsRepository as PropertyPostsRepositoryType } from "@/real-state/infrastructure/persistence/repositories/posts";
// import { UsersRepository as UsersRepositoryType } from "@/user/infrastructure/persistence/repositories/user";

// import {
//   PropertyPostsRepository,
//   UsersRepository,
//   UsersService,
// } from "../../../../../test/mocks";
// import { getPropertyPostStub } from "../../../../../test/stubs";
// import { I18nService } from "nestjs-i18n";
// import { UsersService as UsersServiceType } from "@/user/application/services/implementations";
// import { PaginatedQuery } from "@/common/infrastructure/util";
// import {
//   PropertyPost,
//   PropertyPostDocument,
// } from "@/real-state/infrastructure/persistence/schemas";

// describe.skip("PropertyPostsService", () => {
//   let service: PropertyPostServiceType;
//   let usersService: UsersServiceType;
//   let repository: PropertyPostsRepositoryType;

//   const PropertyPostsRepositoryProvider: Provider = {
//     provide: PropertyPostsRepositoryType,
//     useClass: PropertyPostsRepository,
//   };

//   const UsersRepositoryProvider: Provider = {
//     provide: UsersRepositoryType,
//     useClass: UsersRepository,
//   };

//   const UserServiceProvider: Provider = {
//     provide: "IUsersService",
//     useValue: UsersService,
//   };

//   const PropertyPostServiceProvider: Provider = {
//     provide: "IPropertyPostsService",
//     useClass: PropertyPostsService,
//   };

//   const I18nServiceProvider: Provider = {
//     provide: I18nService,
//     useValue: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         PropertyPostServiceProvider,
//         PropertyPostsService,
//         UsersRepositoryProvider,
//         UsersRepository,
//         PropertyPostsRepository,
//         UserServiceProvider,
//         UsersService,
//         PropertyPostsRepositoryProvider,
//         I18nServiceProvider,
//       ],
//     }).compile();

//     service = module.get<PropertyPostServiceType>(PropertyPostsService);

//     usersService = module.get<UsersServiceType>(UsersService);

//     repository = module.get<PropertyPostsRepositoryType>(
//       PropertyPostsRepository,
//     );

//     jest.clearAllMocks();
//   });

//   it("should be defined", () => {
//     expect(service).toBeDefined();
//     expect(usersService).toBeDefined();
//   });

//   describe("operations", () => {
//     describe("findAll", () => {
//       let propertyPosts: PaginatedQuery<PropertyPostDocument>;

//       beforeEach(async () => {
//         propertyPosts = await service.findAll({ page: 1, perPage: 10 });
//       });

//       test("then it should call find on the repository", () => {
//         expect(repository.paginate).toHaveBeenCalled();
//       });

//       test("then it should return two propertyPosts", () => {
//         expect(propertyPosts).toEqual([
//           getPropertyPostStub(),
//           getPropertyPostStub(),
//         ]);
//       });
//     });

//     describe("find by id", () => {
//       describe("without errors", () => {
//         let propertyPost: PropertyPost;

//         beforeEach(async () => {
//           propertyPost = await service.findById(getPropertyPostStub()._id);
//         });

//         test("then it should call findOne on the repository", () => {
//           expect(repository.findOne).toHaveBeenCalledWith({
//             _id: getPropertyPostStub()._id,
//           });
//         });

//         test("then it should return a propertyPost", () => {
//           expect(propertyPost).toEqual(getPropertyPostStub());
//         });
//       });
//     });

//     describe("create", () => {
//       let propertyPost: PropertyPost;

//       beforeEach(async () => {
//         jest.spyOn(usersService, "findCurrent");

//         propertyPost = await service.create(getPropertyPostStub());
//       });

//       test("then it should call create on the repository", () => {
//         expect(repository.create).toHaveBeenCalledWith(getPropertyPostStub());
//       });

//       test("then it should return a propertyPost", () => {
//         expect(propertyPost).toEqual(getPropertyPostStub());
//       });
//     });

//     describe("update", () => {
//       let propertyPost: PropertyPost | null;

//       beforeEach(async () => {
//         propertyPost = await service.update(
//           getPropertyPostStub()._id,
//           getPropertyPostStub(),
//         );
//       });

//       test("then it should call findOneAndUpdate on the repository", () => {
//         expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
//           { _id: getPropertyPostStub()._id },
//           getPropertyPostStub(),
//         );
//       });

//       test("then it should return a propertyPost", () => {
//         expect(propertyPost).toEqual(getPropertyPostStub());
//       });
//     });
//   });
// });
