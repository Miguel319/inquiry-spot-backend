import { NameType } from "@/common/domain/entities";

export class VehicleStatusCreatedEvent {
  constructor(
    public readonly vehicleStatusId: string,
    public readonly name: NameType,
  ) {}
}
