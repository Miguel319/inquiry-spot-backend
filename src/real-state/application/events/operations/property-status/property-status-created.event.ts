import { NameType } from "@/common/domain/entities";

export class PropertyStatusCreatedEvent {
  constructor(
    public readonly propertyStatusId: string,
    public readonly name: NameType,
  ) {}
}
