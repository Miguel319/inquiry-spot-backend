import {
  Fuel,
  Transmission,
  VehicleMake,
  VehicleStatus,
  VehicleType,
} from "../../src/domain/types";
import { VehiclePost } from "../../src/domain/entities";
import { Color } from "../../src/domain/types";

export const getVehiclePostStub = (): VehiclePost =>
  ({
    _id: "sajdnasj32324e.3443sdfapSSL.d",
    description: "This is the coolest car in the history of cars",
    make: VehicleMake.ACURA,
    type: VehicleType.CAMPERVAN,
    price: "Abc",
    exteriorColor: Color.WHITE,
    electric: {
      chargingTime: "abc",
      range: "abc",
    },
    status: VehicleStatus.NEW,
    topSpeed: "abc",
    transmission: Transmission.AUTOMATIC,
    primaryImage: "ABC",
    secondaryImages: [""],
    model: "abc 123",
    interiorColor: Color.BLACK,
    traction: "Cool traction",
    speed: "900 km/h",
    fuelType: Fuel.BIODIESEL,
    accessories: ["Accessory 1", "Accessory 2", "Accessory 3"],
    use: "abc",
  } as unknown as VehiclePost);
