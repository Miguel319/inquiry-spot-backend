import { Email } from "../../../domain/entities";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { FilterQuery } from "mongoose";
import { EmailModel } from "../../../../test/support";
import { EmailsRepository } from "./emails.repository";

import { getEmailStub } from "../../../../test/stubs";

describe("EmailsRepository", () => {
  let emailsRepository: EmailsRepository;

  describe("find operations", () => {
    let emailModel: EmailModel;
    let emailFilterQuery: FilterQuery<Email>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          EmailsRepository,
          {
            provide: getModelToken(Email.name),
            useClass: EmailModel,
          },
        ],
      }).compile();

      emailsRepository = moduleRef.get<EmailsRepository>(EmailsRepository);
      emailModel = moduleRef.get<EmailModel>(getModelToken(Email.name));

      emailFilterQuery = {
        _id: getEmailStub()._id,
      };

      jest.clearAllMocks();
    });

    describe("findOne", () => {
      describe("when findOne is called", () => {
        let email: Email | null;

        beforeEach(async () => {
          jest.spyOn(emailModel, "findOne");

          email = await emailsRepository.findOne(emailFilterQuery);
        });

        test("then it should call the emailModel", () => {
          expect(emailModel.findOne).toHaveBeenCalledWith(emailFilterQuery, {
            __v: 0,
          });
        });

        test("then it should return a email", () => {
          expect(email).toEqual(getEmailStub());
        });
      });
    });

    describe("find", () => {
      describe("when find is called", () => {
        let emails: Array<Email>;

        beforeEach(async () => {
          jest.spyOn(emailModel, "find");

          emails = await emailsRepository.find({});
        });

        test("then it should call the emailModel", () => {
          expect(emailModel.find).toHaveBeenCalledWith({}, { __v: 0 });
        });

        test("then it should return a email", () => {
          expect(emails).toEqual([getEmailStub(), getEmailStub()]);
        });
      });
    });

    describe("findOneAndUpdate", () => {
      describe("when findOneAndUpdate is called", () => {
        let email: Email | null;

        beforeEach(async () => {
          jest.spyOn(emailModel, "findOneAndUpdate");

          email = await emailsRepository.findOneAndUpdate(
            emailFilterQuery,
            getEmailStub(),
          );
        });

        test("then it should call the emailModel", () => {
          expect(emailModel.findOneAndUpdate).toHaveBeenCalledWith(
            emailFilterQuery,
            getEmailStub(),
            { new: true },
          );
        });

        test("then it should return a email", () => {
          expect(email).toEqual(getEmailStub());
        });
      });
    });

    describe("deleteOne", () => {
      describe("when deleteOne is called", () => {
        let result: boolean = true;

        beforeEach(async () => {
          jest.spyOn(emailModel, "deleteOne");

          result = await emailsRepository.deleteOne(emailFilterQuery);
        });

        test("then it should call the emailModel", () => {
          expect(emailModel.deleteOne).toHaveBeenCalledWith(emailFilterQuery);
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
          jest.spyOn(emailModel, "deleteMany");

          result = await emailsRepository.deleteMany(emailFilterQuery);
        });

        test("then it should call the emailModel", () => {
          expect(emailModel.deleteMany).toHaveBeenCalledWith(emailFilterQuery);
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
          EmailsRepository,
          {
            provide: getModelToken(Email.name),
            useValue: EmailModel,
          },
        ],
      }).compile();

      emailsRepository = moduleRef.get<EmailsRepository>(EmailsRepository);
    });

    describe("create", () => {
      describe("when create is called", () => {
        let email: Email;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(EmailModel.prototype, "save");
          constructorSpy = jest.spyOn(EmailModel.prototype, "constructorSpy");
          email = await emailsRepository.create(getEmailStub());
        });

        test("then it should call the emailModel", () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(getEmailStub());
        });

        test("then it should return a email", () => {
          expect(email).toEqual(getEmailStub());
        });
      });
    });
  });
});
