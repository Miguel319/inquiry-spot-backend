import { getVehiclePostStub } from "../../stubs";

export const VehiclePostsService = jest.fn().mockReturnValue({
  findAll: jest
    .fn()
    .mockResolvedValue([getVehiclePostStub(), getVehiclePostStub()]),
  findByEmail: jest.fn().mockResolvedValue(getVehiclePostStub()),
  findCurrent: jest.fn().mockResolvedValue(getVehiclePostStub()),
  findById: jest.fn().mockResolvedValue(getVehiclePostStub()),
  create: jest.fn().mockResolvedValue(getVehiclePostStub()),
  update: jest.fn().mockResolvedValue(getVehiclePostStub()),
  delete: jest.fn().mockResolvedValue(true),
  findFromSeller: jest.fn().mockResolvedValue(getVehiclePostStub()),
  findAllFromSeller: jest
    .fn()
    .mockResolvedValue([getVehiclePostStub(), getVehiclePostStub()]),
});
