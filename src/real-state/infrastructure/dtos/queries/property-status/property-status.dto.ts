import { NameType } from "@/common/domain/entities";
import { Presenter } from "@/common/infrastructure/presenters";
import { PropertyStatus } from "@/real-state/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class PropertyStatusDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: NameType;

  private constructor(propertyStatus: PropertyStatus) {
    super(propertyStatus);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (propertyStatus as any).name || propertyStatus?.getName();
  }

  public static create(propertyStatus: PropertyStatus) {
    return new PropertyStatusDto(propertyStatus);
  }
}
