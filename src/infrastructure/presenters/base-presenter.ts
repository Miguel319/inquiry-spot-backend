import { BaseEntity } from "@/domain/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";

export abstract class Presenter {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  protected constructor(presenter: BaseEntity) {
    this._id = presenter._id;
    this.createdAt = presenter.createdAt;
    this.updatedAt = presenter.updatedAt;
  }
}
