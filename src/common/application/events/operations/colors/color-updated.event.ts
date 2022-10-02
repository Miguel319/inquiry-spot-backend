import { NameType } from "@/common/domain/entities";

export class ColorUpdatedEvent {
  constructor(
    public readonly colorId: string,
    public readonly newName: NameType,
  ) {}
}
