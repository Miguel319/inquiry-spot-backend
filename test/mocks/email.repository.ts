import { getEmailStub } from "../stubs";

export const EmailsRepository = jest.fn().mockReturnValue({
  find: jest.fn().mockResolvedValue([getEmailStub(), getEmailStub()]),
  findOne: jest.fn().mockResolvedValue(getEmailStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(getEmailStub()),
  create: jest.fn().mockResolvedValue(getEmailStub()),
  deleteOne: jest.fn().mockResolvedValue(false),
  deleteMany: jest.fn().mockResolvedValue(false),
});
