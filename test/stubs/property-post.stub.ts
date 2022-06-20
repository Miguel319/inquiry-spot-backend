import * as types from "../../src/domain/types";
import { PropertyPost } from "../../src/domain/entities";

export const getPropertyPostStub = (): PropertyPost =>
  ({
    address: {
      addressLine1: "Street 1 abc",
      city: "Santo Domingo",
      province: "Santo Domingo",
    },
    bathroomCount: 3,
    bedroomCount: 2,
    additionalInfo: ["Abc", "abc 123"],
    propertyStatus: types.PropertyStatus.NEW,
    primaryImage: "abc",
    secondaryImages: ["abc", "abc"],
    territory: 200,
    parkingLotCount: 2,
    buyingOption: types.BuyingOption.BUY,
    seller: "23423498sdfsd98932",
    price: "USD$ 200,000.00",
    propertyType: types.PropertyType.APARTMENT,
  } as PropertyPost);
