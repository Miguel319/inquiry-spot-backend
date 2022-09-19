import { PropertyPost } from "@/property/infrastructure/persistence/schemas";
import { getPropertyPostStub } from "../stubs";
import { BaseRepoMock } from "./base-repo.mock";

export class PropertyPostModel extends BaseRepoMock<PropertyPost> {
  protected entityStub: PropertyPost = getPropertyPostStub();
}
