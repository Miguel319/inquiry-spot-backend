import { IBaseEntity } from "@/common/domain/types";
import { ApiProperty } from "@nestjs/swagger";

interface IAggrateRoot {
  getId: () => string;
  getCreatedAt: () => Date;
  getUpdatedAt: () => Date;
}

export abstract class Presenter {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  private isBaseEntity(
    entity: IBaseEntity | IAggrateRoot,
  ): entity is IBaseEntity {
    return "_id" in entity;
  }

  protected constructor(presenter: IBaseEntity | IAggrateRoot) {
    this._id = this.isBaseEntity(presenter) ? presenter._id : presenter.getId();

    this.createdAt = this.isBaseEntity(presenter)
      ? presenter.createdAt
      : presenter.getCreatedAt();

    this.updatedAt = this.isBaseEntity(presenter)
      ? presenter.updatedAt
      : presenter.getUpdatedAt();
  }
}
