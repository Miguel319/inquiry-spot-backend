export { FetchPaginatedFuelsQueryHandler } from "./fetch-paginated-fuels-query.handler";
export { FetchFuelByIdQueryHandler } from "./fetch-fuel-by-id-query.handler";

import { FetchPaginatedFuelsQueryHandler } from "./fetch-paginated-fuels-query.handler";
import { FetchFuelByIdQueryHandler } from "./fetch-fuel-by-id-query.handler";

export const FuelQueryHandlers = [
  FetchPaginatedFuelsQueryHandler,
  FetchFuelByIdQueryHandler,
];
