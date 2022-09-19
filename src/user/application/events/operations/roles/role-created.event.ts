import { NameType } from "@/common/domain/entities";

export class RoleCreatedEvent {
  constructor(public readonly roleId: string, public readonly name: NameType) {}
}
