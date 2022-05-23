import { VehiclePost } from "../../src/domain/entities";

export const getVehiclePostStub = (): VehiclePost =>
  ({
    _id: "sajdnasj32324e.3443sdfapSSL.d",
    title: "Cool car",
    description: "This is the coolest car in the history of cars",
    make: "The ultimate make",
    type: "The ultimate type",
    price: 3435545345,
    exteriorColor: "Blue",
    interiorColor: "Black",
    traction: "Cool traction",
    motor: "Cool motor",
    speed: "900 km/h",
    fuelType: "Cool fuel",
    isNew: true,
    accessories: ["Accessory 1", "Accessory 2", "Accessory 3"],
    address: "Abc",
  } as VehiclePost);
