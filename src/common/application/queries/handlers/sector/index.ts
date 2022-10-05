export { FetchPaginatedSectorsQueryHandler } from "./fetch-paginated-sectors-query.handler";
export { FetchSectorByIdQueryHandler } from "./fetch-sector-by-id-query.handler";

import { FetchPaginatedSectorsQueryHandler } from "./fetch-paginated-sectors-query.handler";
import { FetchSectorByIdQueryHandler } from "./fetch-sector-by-id-query.handler";

export const SectorsQueryHandlers = [
  FetchPaginatedSectorsQueryHandler,
  FetchSectorByIdQueryHandler,
];
