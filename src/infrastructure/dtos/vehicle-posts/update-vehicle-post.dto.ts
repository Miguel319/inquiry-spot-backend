export class UpdateVehiclePostDto {
  readonly description: string;

  readonly make: string;

  readonly type: string;

  readonly price: number;

  readonly exteriorColor: string;

  readonly interiorColor: string;

  readonly traction: string;

  readonly motor: string;

  readonly speed: string;

  readonly fuelType: string;

  readonly isNew: boolean;

  readonly use: string;

  readonly accessories: string[];

  readonly address: string;

  readonly photos: string[];
}
