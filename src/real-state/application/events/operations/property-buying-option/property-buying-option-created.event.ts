import { NameType } from "@/common/domain/entities";

export class PropertyBuyingOptionCreatedEvent {
  constructor(
    public readonly propertyStatusId: string,
    public readonly name: NameType,
  ) {}
}
