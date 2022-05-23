import { VehiclePost } from "../../src/domain/entities";
import { getVehiclePostStub } from "../stubs";
import { BaseRepoMock } from "./base-repo.mock";

export class VehiclePostModel extends BaseRepoMock<VehiclePost> {
  protected entityStub = getVehiclePostStub();
}
