import { getPropertyPostStub } from "../../stubs";

export const PropertyPostsService = jest.fn().mockReturnValue({
  findAll: jest
    .fn()
    .mockResolvedValue([getPropertyPostStub(), getPropertyPostStub()]),
  findById: jest.fn().mockResolvedValue(getPropertyPostStub()),
  create: jest.fn().mockResolvedValue(getPropertyPostStub()),
  update: jest.fn().mockResolvedValue(getPropertyPostStub()),
  delete: jest.fn().mockResolvedValue(true),
  findAllFromSeller: jest
    .fn()
    .mockResolvedValue([getPropertyPostStub(), getPropertyPostStub()]),
});
