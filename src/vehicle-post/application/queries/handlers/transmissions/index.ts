export { FetchPaginatedTransmissionsQueryHandler } from "./fetch-paginated-transmissions-query.handler";
export { FetchTransmissionByIdQueryHandler } from "./fetch-transmission-by-id.query";

import { FetchPaginatedTransmissionsQueryHandler } from "./fetch-paginated-transmissions-query.handler";
import { FetchTransmissionByIdQueryHandler } from "./fetch-transmission-by-id.query";

export const TransmissionQueryHandlers = [
  FetchPaginatedTransmissionsQueryHandler,
  FetchTransmissionByIdQueryHandler,
];
