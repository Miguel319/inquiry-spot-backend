import { NameType } from "@/common/domain/entities";
import { Presenter } from "@/common/infrastructure/presenters";
import { PropertyType } from "@/property/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class PropertyTypeDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: NameType;

  private constructor(propertyType: PropertyType) {
    super(propertyType);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (propertyType as any).name || propertyType?.getName();
  }

  public static create(propertyType: PropertyType) {
    return new PropertyTypeDto(propertyType);
  }
}
