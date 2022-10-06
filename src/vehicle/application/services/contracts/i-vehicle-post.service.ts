import { VehiclePost } from "@/vehicle/domain/entities";
import { UpdateVehiclePostDto } from "@/vehicle/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export interface IVehiclePostsService {
  mapToEntities(
    vehiclePost: VehiclePost,
    i18n: I18nContext,
    operation: "create" | "edit",
    dto?: UpdateVehiclePostDto,
  ): Promise<void>;

  findById(_id: string, i18n: I18nContext): Promise<VehiclePost>;
}
