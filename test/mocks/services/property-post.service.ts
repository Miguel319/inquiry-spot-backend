import { getPropertyPostStub } from "../../stubs";

export const PropertyPostsService = jest.fn().mockReturnValue({
  findAll: jest
    .fn()
    .mockResolvedValue([getPropertyPostStub(), getPropertyPostStub()]),
  findByEmail: jest.fn().mockResolvedValue(getPropertyPostStub()),
  findCurrent: jest.fn().mockResolvedValue(getPropertyPostStub()),
  findById: jest.fn().mockResolvedValue(getPropertyPostStub()),
  create: jest.fn().mockResolvedValue(getPropertyPostStub()),
  update: jest.fn().mockResolvedValue(getPropertyPostStub()),
});
