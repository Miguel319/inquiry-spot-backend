import { VehiclePost } from "@/domain/entities";
import { IBaseService } from "./i-base.service";

export interface IVehiclePostsService extends IBaseService<VehiclePost> {
  findFromSeller(id: string): Promise<VehiclePost>;
}
