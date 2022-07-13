import { User } from "@/domain/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Presenter } from "./base-presenter";

export class UserPresenter extends Presenter {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  image: string;

  private constructor(user: User) {
    super(user._id);

    this.name = user.name;
    this.email = user.email;
    this.image = user.image;
  }

  static create(user: User): UserPresenter {
    return new UserPresenter(user);
  }
}
