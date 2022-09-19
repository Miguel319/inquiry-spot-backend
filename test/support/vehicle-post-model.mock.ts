import { VehiclePost } from "@/vehicle/domain";
import { getVehiclePostStub } from "../stubs";
import { BaseRepoMock } from "./base-repo.mock";

export class VehiclePostModel extends BaseRepoMock<VehiclePost> {
  protected entityStub: VehiclePost = getVehiclePostStub();
}
