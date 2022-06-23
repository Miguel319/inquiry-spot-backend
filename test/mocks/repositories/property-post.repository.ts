import { getPropertyPostStub } from "../../stubs";

export const PropertyPostsRepository = jest.fn().mockReturnValue({
  find: jest
    .fn()
    .mockResolvedValue([getPropertyPostStub(), getPropertyPostStub()]),
  findOne: jest.fn().mockResolvedValue(getPropertyPostStub()),
  paginate: jest
    .fn()
    .mockResolvedValue([getPropertyPostStub(), getPropertyPostStub()]),
  findOneAndUpdate: jest.fn().mockResolvedValue(getPropertyPostStub()),
  create: jest.fn().mockResolvedValue(getPropertyPostStub()),
  deleteOne: jest.fn().mockResolvedValue(false),
  deleteMany: jest.fn().mockResolvedValue(false),
});
