import { NameType } from "@/common/domain/entities";

export class VehiclePostDeletedEvent {
  constructor(
    public readonly vehiclePostId: string,
    public readonly newName: NameType,
  ) {}
}
