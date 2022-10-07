export { FetchPaginatedVehiclePostsQueryHandler } from "./fetch-paginated-vehicle-posts-query.handler";
export { FetchVehiclePostByIdQueryHandler } from "./fetch-vehicle-post-by-id-query.handler";
export { FetchVehiclePostsFromSellerQueryHandler } from "./fetch-vehicle-posts-from-seller-query.handler";
export { FetchLastFiveVehiclePostsQueryHandler } from "./fetch-last-five-vehicle-posts-query.handler";

import { FetchPaginatedVehiclePostsQueryHandler } from "./fetch-paginated-vehicle-posts-query.handler";
import { FetchVehiclePostByIdQueryHandler } from "./fetch-vehicle-post-by-id-query.handler";
import { FetchVehiclePostsFromSellerQueryHandler } from "./fetch-vehicle-posts-from-seller-query.handler";
import { FetchLastFiveVehiclePostsQueryHandler } from "./fetch-last-five-vehicle-posts-query.handler";

export const VehiclePostsQueryHandlers = [
  FetchPaginatedVehiclePostsQueryHandler,
  FetchVehiclePostByIdQueryHandler,
  FetchVehiclePostsFromSellerQueryHandler,
  FetchLastFiveVehiclePostsQueryHandler,
];
