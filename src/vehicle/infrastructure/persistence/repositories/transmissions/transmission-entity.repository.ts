import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { Transmission } from "@/vehicle/domain/entities";
import { TransmissionSchemaFactory } from "@/vehicle/infrastructure/factories";
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
    transmissionModel: Model<TransmissionSchema>,
    transmissionSchemaFactory: TransmissionSchemaFactory,
  ) {
    super(transmissionModel, transmissionSchemaFactory);
  }
}
