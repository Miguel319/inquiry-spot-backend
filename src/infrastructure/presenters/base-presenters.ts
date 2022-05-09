import { ApiProperty } from "@nestjs/swagger";

export abstract class Presenter {
  @ApiProperty()
  _id: string;

  protected constructor(_id: string) {
    this._id = _id;
  }
}
