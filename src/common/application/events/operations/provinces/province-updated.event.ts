import { NameType } from "@/common/domain/entities";

export class ProvinceUpdatedEvent {
  constructor(
    public readonly provinceId: string,
    public readonly newName: NameType,
  ) {}
}
