import { getUserStub } from "../../stubs";

export const UsersService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([getUserStub(), getUserStub()]),
  findByEmail: jest.fn().mockResolvedValue(getUserStub()),
  findCurrent: jest.fn().mockResolvedValue(getUserStub()),
  findById: jest.fn().mockResolvedValue(getUserStub()),
  create: jest.fn().mockResolvedValue(getUserStub()),
  update: jest.fn().mockResolvedValue(getUserStub()),
});
