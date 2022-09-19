import { EntitySchemaFactory } from "@/common/infrastructure/persistence/factories";
import { Transmission } from "@/vehicle/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { TransmissionSchema } from "../../persistence/schemas";

@Injectable()
export class TransmissionSchemaFactory
  implements EntitySchemaFactory<TransmissionSchema, Transmission>
{
  public create(vehicleMake: Transmission): TransmissionSchema {
    return {
      _id: new Types.ObjectId(vehicleMake.getId()),
      name: vehicleMake.getName(),
      createdAt: vehicleMake.getCreatedAt(),
      updatedAt: vehicleMake.getUpdatedAt(),
    };
  }

  public createFromSchema(
    entitySchema: TransmissionSchema | null,
  ): Transmission | null {
    if (!entitySchema) return null;

    return new Transmission({
      ...entitySchema,
      _id: entitySchema._id.toHexString(),
    });
  }
}
