export { FetchPaginatedVehicleTypesQueryHandler } from "./fetch-paginated-vehicle-types-query.handler";
export { FetchVehicleTypeByIdQueryHandler } from "./fetch-vehicle-type-by-id-query.handler";

import { FetchPaginatedVehicleTypesQueryHandler } from "./fetch-paginated-vehicle-types-query.handler";
import { FetchVehicleTypeByIdQueryHandler } from "./fetch-vehicle-type-by-id-query.handler";

export const VehicleTypesQueryHandlers = [
  FetchPaginatedVehicleTypesQueryHandler,
  FetchVehicleTypeByIdQueryHandler,
];
