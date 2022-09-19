import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { Role } from "@/user/domain/entities";
import { RoleDto } from "@/user/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { RoleDocument, RoleSchema } from "../../schemas";

@Injectable()
export class RoleDtoRepository {
  constructor(
    @InjectModel(RoleSchema.name)
    private readonly role: Model<RoleSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<RoleSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<RoleDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.role as any).paginate({ ...entityFilterQuery }, { options });
  }

  private createRoleDto(role: RoleDocument): RoleDto {
    return RoleDto.create(role as unknown as Role);
  }

  async getById(_id: string): Promise<RoleDto | null> {
    const role = await this.role.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!role) return null;

    return this.createRoleDto(role);
  }

  async getAll(): Promise<RoleDto[]> {
    return (await this.role.find({}, {}, { lean: true })).map(
      (v) => v as unknown as RoleDto,
    );
  }
}
