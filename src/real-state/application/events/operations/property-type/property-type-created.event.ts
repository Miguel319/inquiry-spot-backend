import { NameType } from "@/common/domain/entities";

export class PropertyTypeCreatedEvent {
  constructor(public readonly propertyTypeId: string, public name: NameType) {}
}
