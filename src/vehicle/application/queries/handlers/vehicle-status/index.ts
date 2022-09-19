export { FetchPaginatedVehicleStatussQueryHandler } from "./fetch-paginated-vehicle-status-query.handler";
export { FetchVehicleStatusByIdQueryHandler } from "./fetch-vehicle-status-by-id-query.handler";

import { FetchPaginatedVehicleStatussQueryHandler } from "./fetch-paginated-vehicle-status-query.handler";
import { FetchVehicleStatusByIdQueryHandler } from "./fetch-vehicle-status-by-id-query.handler";

export const VehicleStatussQueryHandlers = [
  FetchPaginatedVehicleStatussQueryHandler,
  FetchVehicleStatusByIdQueryHandler,
];
