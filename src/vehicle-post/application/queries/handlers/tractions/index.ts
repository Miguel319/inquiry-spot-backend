export { FetchPaginatedTractionsQueryHandler } from "./fetch-paginated-tractions-query.handler";
export { FetchTractionByIdQueryHandler } from "./fetch-tractions-by-id.query";

import { FetchPaginatedTractionsQueryHandler } from "./fetch-paginated-tractions-query.handler";
import { FetchTractionByIdQueryHandler } from "./fetch-tractions-by-id.query";

export const TractionQueryHandlers = [
  FetchPaginatedTractionsQueryHandler,
  FetchTractionByIdQueryHandler,
];
