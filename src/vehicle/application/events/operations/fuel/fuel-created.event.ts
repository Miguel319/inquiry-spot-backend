import { NameType } from "@/common/domain/entities";

export class FuelCreatedEvent {
  constructor(public readonly fuelId: string, public readonly name: NameType) {}
}
