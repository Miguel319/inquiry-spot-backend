import { NameType } from "@/common/domain/entities";
import { Presenter } from "@/common/infrastructure/presenters";
import { Role } from "@/user/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class RoleDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: NameType;

  private constructor(role: Role) {
    super(role);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (role as any).name || role?.getName();
  }

  public static create(role: Role) {
    return new RoleDto(role);
  }
}
