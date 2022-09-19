export { FetchPaginatedVehicleStatusQueryHandler } from "./fetch-paginated-vehicle-status-query.handler";
export { FetchVehicleStatusByIdQueryHandler } from "./fetch-vehicle-status-by-id-query.handler";

import { FetchPaginatedVehicleStatusQueryHandler } from "./fetch-paginated-vehicle-status-query.handler";
import { FetchVehicleStatusByIdQueryHandler } from "./fetch-vehicle-status-by-id-query.handler";

export const VehicleStatusQueryHandlers = [
  FetchPaginatedVehicleStatusQueryHandler,
  FetchVehicleStatusByIdQueryHandler,
];
