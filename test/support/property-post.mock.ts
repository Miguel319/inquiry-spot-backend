import { PropertyPost } from "../../src/domain/entities";
import { getPropertyPostStub } from "../stubs";
import { BaseRepoMock } from "./base-repo.mock";

export class PropertyPostModel extends BaseRepoMock<PropertyPost> {
  protected entityStub: PropertyPost = getPropertyPostStub();
}
