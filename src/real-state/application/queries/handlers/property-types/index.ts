export { FetchPaginatedPropertyTypesQueryHandler } from "./fetch-paginated-property-types-query.handler";
export { FetchPropertyTypeByIdQueryHandler } from "./fetch-property-type-by-id-query.handler";

import { FetchPaginatedPropertyTypesQueryHandler } from "./fetch-paginated-property-types-query.handler";
import { FetchPropertyTypeByIdQueryHandler } from "./fetch-property-type-by-id-query.handler";

export const PropertyTypesQueryHandlers = [
  FetchPaginatedPropertyTypesQueryHandler,
  FetchPropertyTypeByIdQueryHandler,
];
