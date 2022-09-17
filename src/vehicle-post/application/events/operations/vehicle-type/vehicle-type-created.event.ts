import { NameType } from "@/common/domain/entities";

export class VehicleTypeCreatedEvent {
  constructor(
    public readonly vehicleTypeId: string,
    public readonly name: NameType,
  ) {}
}
