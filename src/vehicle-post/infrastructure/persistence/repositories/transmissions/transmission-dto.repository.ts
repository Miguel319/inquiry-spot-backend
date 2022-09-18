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
    private readonly transmission: Model<TransmissionSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<TransmissionSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<TransmissionDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.transmission as any).paginate(
      { ...entityFilterQuery },
      { options },
    );
  }

  private createTransmissionDto(
    transmission: TransmissionDocument,
  ): TransmissionDto {
    return TransmissionDto.create(transmission as unknown as Transmission);
  }

  async getById(_id: string): Promise<TransmissionDto | null> {
    const transmission = await this.transmission.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!transmission) return null;

    return this.createTransmissionDto(transmission);
  }

  async getAll(): Promise<TransmissionDto[]> {
    return (await this.transmission.find({}, {}, { lean: true })).map(
      (v) => v as unknown as TransmissionDto,
    );
  }
}
