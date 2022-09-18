import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { Transmission } from "@/vehicle-post/domain/entities";
import { TransmissionSchemaFactory } from "@/vehicle-post/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TransmissionSchema } from "../../schemas";

@Injectable()
export class TransmissionEntityRepository extends BaseEntityRepository<
  TransmissionSchema,
  Transmission
> {
  constructor(
    @InjectModel(TransmissionSchema.name)
    vehicleMakeModel: Model<TransmissionSchema>,
    vehicleMakeSchemaFactory: TransmissionSchemaFactory,
  ) {
    super(vehicleMakeModel, vehicleMakeSchemaFactory);
  }
}
