import { ApiProperty } from "@nestjs/swagger";

export abstract class Presenter {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  protected constructor(presenter: Presenter) {
    this._id = presenter._id;
    this.createdAt = presenter.createdAt;
    this.updatedAt = presenter.updatedAt;
  }
}
