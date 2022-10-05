import { NameType } from "@/common/domain/entities";

export class VehiclePostUpdatedEvent {
  constructor(
    public readonly vehiclePostId: string,
    public readonly newName: NameType,
  ) {}
}
