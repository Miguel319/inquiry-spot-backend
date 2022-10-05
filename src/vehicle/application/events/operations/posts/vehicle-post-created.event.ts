import { NameType } from "@/common/domain/entities";

export class VehiclePostCreatedEvent {
  constructor(
    public readonly vehiclePostId: string,
    public readonly name: NameType,
  ) {}
}
