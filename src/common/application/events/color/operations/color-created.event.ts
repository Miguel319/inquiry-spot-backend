import { NameType } from "@/common/domain/entities";

export class ColorCreatedEvent {
  constructor(
    public readonly colorId: string,
    public readonly name: NameType,
  ) {}
}
