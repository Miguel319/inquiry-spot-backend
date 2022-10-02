export { FetchPaginatedMunicipalitiesQueryHandler } from "./fetch-paginated-municipalities-query.handler";
export { FetchMunicipalityByIdQueryHandler } from "./fetch-municipality-by-id-query.handler";

import { FetchPaginatedMunicipalitiesQueryHandler } from "./fetch-paginated-municipalities-query.handler";
import { FetchMunicipalityByIdQueryHandler } from "./fetch-municipality-by-id-query.handler";

export const MunicipalitiesQueryHandlers = [
  FetchPaginatedMunicipalitiesQueryHandler,
  FetchMunicipalityByIdQueryHandler,
];
