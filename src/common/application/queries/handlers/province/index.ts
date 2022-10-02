export { FetchPaginatedProvincesQueryHandler } from "./fetch-paginated-provinces-query.handler";
export { FetchProvinceByIdQueryHandler } from "./fetch-province-by-id-query.handler";

import { FetchPaginatedProvincesQueryHandler } from "./fetch-paginated-provinces-query.handler";
import { FetchProvinceByIdQueryHandler } from "./fetch-province-by-id-query.handler";

export const ProvincesQueryHandlers = [
  FetchPaginatedProvincesQueryHandler,
  FetchProvinceByIdQueryHandler,
];
