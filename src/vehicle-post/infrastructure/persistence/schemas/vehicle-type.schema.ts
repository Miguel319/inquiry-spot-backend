import { BaseEntity } from "@/common/domain/entities";
import { VehicleTypeTranslations } from "@/vehicle-post/application/translations";
import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ timestamps: true, collection: "vehicle-types" })
export class VehicleTypeSchema extends BaseEntity {
  @Prop({
    required: [true, VehicleTypeTranslations.NAME],
  })
  name: string;
}
