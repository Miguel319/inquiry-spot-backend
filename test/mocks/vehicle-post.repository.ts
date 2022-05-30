import { getVehiclePostStub } from "../stubs";

export const VehiclePostsRepository = jest.fn().mockReturnValue({
  find: jest
    .fn()
    .mockResolvedValue([getVehiclePostStub(), getVehiclePostStub()]),
  findOne: jest.fn().mockResolvedValue(getVehiclePostStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(getVehiclePostStub()),
  create: jest.fn().mockResolvedValue(getVehiclePostStub()),
  deleteOne: jest.fn().mockResolvedValue(false),
  deleteMany: jest.fn().mockResolvedValue(false),
});
