import { User } from "@/user/infrastructure/persistence/schemas";
import { ApiProperty } from "@nestjs/swagger";
import { Presenter } from "./base-presenter";

export class UserPresenter extends Presenter {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly image: string;

  private constructor(user: User) {
    super(user);

    this.name = user.name;
    this.email = user.email;
    this.image = user.image;
  }

  static create(user: User): UserPresenter {
    return new UserPresenter(user);
  }
}
