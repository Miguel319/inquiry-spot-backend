import { PropertyPost } from "@/domain/entities";
import { IBaseService } from "./i-base.service";

export interface IPropertyPostsService extends IBaseService<PropertyPost> {
  findFromSeller(_id: string): Promise<PropertyPost>;
}
