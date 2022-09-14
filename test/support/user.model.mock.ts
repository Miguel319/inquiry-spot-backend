import { User } from "@/user/infrastructure/persistence/schemas";
import { getUserStub } from "../stubs";
import { BaseRepoMock } from "./base-repo.mock";

export class UserModel extends BaseRepoMock<User> {
  protected entityStub = getUserStub();
}
