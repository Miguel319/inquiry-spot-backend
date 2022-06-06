import { VehiclePost, Colors } from "../../src/domain/entities";

export const getVehiclePostStub = (): VehiclePost =>
  ({
    _id: "sajdnasj32324e.3443sdfapSSL.d",
    description: "This is the coolest car in the history of cars",
    make: "The ultimate make",
    type: "The ultimate type",
    price: "Abc",
    exteriorColor: Colors.White,
    interiorColor: Colors.Black,
    traction: "Cool traction",
    motor: "Cool motor",
    speed: "900 km/h",
    fuelType: "Cool fuel",
    isNew: true,
    accessories: ["Accessory 1", "Accessory 2", "Accessory 3"],
    address: "Abc",
    use: "",
  } as VehiclePost);
