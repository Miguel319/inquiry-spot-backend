import { NameType } from "@/common/domain/entities";
import { Presenter } from "@/common/infrastructure/presenters";
import { PropertyBuyingOption } from "@/real-state/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class PropertyBuyingOptionDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: NameType;

  private constructor(propertyBuyingOption: PropertyBuyingOption) {
    super(propertyBuyingOption);

    this.name =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (propertyBuyingOption as any).name || propertyBuyingOption?.getName();
  }

  public static create(propertyBuyingOption: PropertyBuyingOption) {
    return new PropertyBuyingOptionDto(propertyBuyingOption);
  }
}
