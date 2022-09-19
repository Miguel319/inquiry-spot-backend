import { Color, Price } from "@/common/domain/types/common";
import {
  ElectricValues,
  Fuel,
  Traction,
  Transmission,
  VehicleMake,
  VehicleStatus,
  VehicleType,
} from "@/vehicle/domain/types";
import { ApiProperty } from "@nestjs/swagger";
import { Presenter } from "../../../../common/infrastructure/presenters";
import { VehiclePost } from "../../persistence/schemas";

export class VehiclePostPresenter extends Presenter {
  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  make: VehicleMake;

  @ApiProperty({ required: true })
  model: string;

  @ApiProperty({ required: true })
  type: VehicleType;

  @ApiProperty({ required: true })
  transmission: Transmission;

  @ApiProperty({ required: true })
  price: Price;

  @ApiProperty({ required: true })
  doorCount: number;

  @ApiProperty({ required: true })
  exteriorColor: Color;

  @ApiProperty({ required: true })
  interiorColor: Color;

  @ApiProperty()
  traction: Traction;

  @ApiProperty()
  topSpeed: string;

  @ApiProperty({ required: true })
  fuelType: Fuel;

  @ApiProperty({ required: true })
  status: VehicleStatus;

  @ApiProperty()
  use: string;

  @ApiProperty({ required: true })
  accessories: string[];

  @ApiProperty({ required: true })
  seller: string;

  @ApiProperty()
  electric: ElectricValues;

  @ApiProperty({ required: true })
  primaryImage: string;

  @ApiProperty({ required: true })
  secondaryImages: string[];

  private constructor(vehiclePost: VehiclePost) {
    super(vehiclePost);

    this.accessories = vehiclePost.accessories;
    this.description = vehiclePost.description;
    this.doorCount = vehiclePost.doorCount;
    this.electric = vehiclePost.electric;
    this.exteriorColor = vehiclePost.exteriorColor;
    this.fuelType = vehiclePost.fuelType;
    this.interiorColor = vehiclePost.interiorColor;
    this.make = vehiclePost.make;
    this.model = vehiclePost.model;
    this.price = vehiclePost.price;
    this.primaryImage = vehiclePost.primaryImage;
    this.secondaryImages = vehiclePost.secondaryImages;
    this.seller = vehiclePost.seller;
    this.status = vehiclePost.status;
    this.topSpeed = vehiclePost.topSpeed;
    this.traction = vehiclePost.traction;
    this.transmission = vehiclePost.transmission;
    this.type = vehiclePost.type;
  }

  public static create(vehiclePost: VehiclePost): VehiclePostPresenter {
    return new VehiclePostPresenter(vehiclePost);
  }
}
