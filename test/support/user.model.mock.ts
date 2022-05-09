import { User } from "../../src/domain/entities";
import { getUserStub } from "../stubs/user.stub";
import { BaseRepoMock } from "./base-repo.mock";

export class UserModel extends BaseRepoMock<User> {
  protected entityStub = getUserStub();
}
