import { IsDefined, IsNotEmpty } from "class-validator";

export class CreateVehiclePostDto {
  @IsNotEmpty()
  @IsDefined({ message: "The title is required." })
  readonly title: string;

  @IsNotEmpty()
  @IsDefined({ message: "The description is required." })
  readonly description: string;

  @IsNotEmpty()
  @IsDefined({ message: "The make is required." })
  readonly make: string;

  @IsNotEmpty()
  @IsDefined({ message: "The type is required." })
  readonly type: string;

  @IsNotEmpty()
  @IsDefined({ message: "The price is required." })
  readonly price: number;

  @IsNotEmpty()
  @IsDefined({ message: "The exterior color is required." })
  readonly exteriorColor: string;

  readonly interiorColor: string;

  readonly traction: string;

  readonly motor: string;

  readonly speed: string;

  readonly fuelType: string;

  @IsNotEmpty()
  @IsDefined({ message: "The is new field is required." })
  readonly isNew: boolean;

  @IsDefined({ message: "The use is required." })
  readonly use: string;

  readonly accessories: string[];

  readonly address: string;

  readonly photos: string[];
}
