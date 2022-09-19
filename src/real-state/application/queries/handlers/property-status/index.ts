export { FetchPaginatedPropertyStatusQueryHandler } from "./fetch-paginated-property-status-query.handler";
export { FetchPropertyStatusByIdQueryHandler } from "./fetch-property-status-by-id-query.handler";

import { FetchPaginatedPropertyStatusQueryHandler } from "./fetch-paginated-property-status-query.handler";
import { FetchPropertyStatusByIdQueryHandler } from "./fetch-property-status-by-id-query.handler";

export const PropertyStatusQueryHandlers = [
  FetchPaginatedPropertyStatusQueryHandler,
  FetchPropertyStatusByIdQueryHandler,
];
