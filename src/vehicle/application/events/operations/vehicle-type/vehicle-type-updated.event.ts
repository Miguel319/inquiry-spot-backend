import { NameType } from "@/common/domain/entities";

export class VehicleTypeUpdatedEvent {
  constructor(
    public readonly vehicleTypeId: string,
    public readonly newName: NameType,
  ) {}
}
