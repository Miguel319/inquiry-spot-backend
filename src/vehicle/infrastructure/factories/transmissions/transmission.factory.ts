import { EntityFactory } from "@/common/infrastructure/persistence/factories";
import { TransmissionCreatedEvent } from "@/vehicle/application/events";
import { Transmission } from "@/vehicle/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { TransmissionSchema } from "../../persistence/schemas";

@Injectable()
export class TransmissionFactory implements EntityFactory<Transmission> {
  constructor(
    @InjectModel(TransmissionSchema.name)
    private readonly _transmissionModel: Model<TransmissionSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<Transmission> {
    const transmission = new Transmission({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._transmissionModel.create(args[0]);

    transmission.apply(
      new TransmissionCreatedEvent(
        transmission.getId(),
        transmission.getName().en,
      ),
    );

    return transmission;
  }
}
