export { FetchPaginatedVehiclePostsQueryHandler } from "./fetch-paginated-vehicle-posts-query.handler";
export { FetchVehiclePostByIdQueryHandler } from "./fetch-vehicle-post-by-id-query.handler";

import { FetchPaginatedVehiclePostsQueryHandler } from "./fetch-paginated-vehicle-posts-query.handler";
import { FetchVehiclePostByIdQueryHandler } from "./fetch-vehicle-post-by-id-query.handler";

export const VehiclePostsQueryHandlers = [
  FetchPaginatedVehiclePostsQueryHandler,
  FetchVehiclePostByIdQueryHandler,
];
