import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { Transmission } from "@/vehicle-post/domain/entities";
import { TransmissionDto } from "@/vehicle-post/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { TransmissionDocument, TransmissionSchema } from "../../schemas";

@Injectable()
export class TransmissionDtoRepository {
  constructor(
    @InjectModel(TransmissionSchema.name)
    private readonly vehicleType: Model<TransmissionSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<TransmissionSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<TransmissionDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.vehicleType as any).paginate(
      { ...entityFilterQuery },
      { options },
    );
  }

  private createTransmissionDto(
    vehicleType: TransmissionDocument,
  ): TransmissionDto {
    return TransmissionDto.create(vehicleType as unknown as Transmission);
  }

  async getById(_id: string): Promise<TransmissionDto | null> {
    const vehicleType = await this.vehicleType.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!vehicleType) return null;

    return this.createTransmissionDto(vehicleType);
  }

  async getAll(): Promise<TransmissionDto[]> {
    return (await this.vehicleType.find({}, {}, { lean: true })).map(
      (v) => v as unknown as TransmissionDto,
    );
  }
}
