import { NameType } from "@/common/domain/entities";

export class TractionCreatedEvent {
  constructor(
    public readonly tractionId: string,
    public readonly name: NameType,
  ) {}
}
