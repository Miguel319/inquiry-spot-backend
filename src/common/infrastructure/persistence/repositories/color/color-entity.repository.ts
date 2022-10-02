import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { Color } from "@/common/domain/entities";
import { ColorSchemaFactory } from "@/common/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ColorSchema } from "../../schemas";

@Injectable()
export class ColorEntityRepository extends BaseEntityRepository<
  ColorSchema,
  Color
> {
  constructor(
    @InjectModel(ColorSchema.name) color: Model<ColorSchema>,
    colorSchemaFactory: ColorSchemaFactory,
  ) {
    super(color, colorSchemaFactory);
  }
}
