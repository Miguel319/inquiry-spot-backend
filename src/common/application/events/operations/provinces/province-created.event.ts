import { NameType } from "@/common/domain/entities";

export class ProvinceCreatedEvent {
  constructor(
    public readonly provinceId: string,
    public readonly name: NameType,
  ) {}
}
