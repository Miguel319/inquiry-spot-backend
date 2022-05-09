import { getUserStub } from "../stubs";

export const UsersRepository = jest.fn().mockReturnValue({
  find: jest.fn().mockResolvedValue([getUserStub(), getUserStub()]),
  findOne: jest.fn().mockResolvedValue(getUserStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(getUserStub()),
  create: jest.fn().mockResolvedValue(getUserStub()),
  deleteOne: jest.fn().mockResolvedValue(false),
  deleteMany: jest.fn().mockResolvedValue(false),
});
