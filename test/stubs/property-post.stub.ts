import {
  BuyingOption,
  PropertyStatus,
  PropertyType,
} from "@/property-post/domain";
import { PropertyPost } from "../../src/domain/entities";
import { Currency } from "../../src/domain/types";

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
    propertyStatus: PropertyStatus.NEW,
    primaryImage: "abc",
    secondaryImages: ["abc", "abc"],
    territory: 200,
    parkingLotCount: 2,
    buyingOption: BuyingOption.BUY,
    seller: "23423498sdfsd98932",
    price: {
      currency: Currency.DOP,
      value: "USD$ 200,000.00",
    },
    propertyType: PropertyType.APARTMENT,
  } as unknown as PropertyPost);
