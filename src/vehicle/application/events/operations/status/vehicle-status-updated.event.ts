import { NameType } from "@/common/domain/entities";

export class VehicleStatusUpdatedEvent {
  constructor(
    public readonly vehicleStatusId: string,
    public readonly newName: NameType,
  ) {}
}
