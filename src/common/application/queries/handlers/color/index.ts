export { FetchPaginatedColorsQueryHandler } from "./fetch-paginated-colors-query.handler";
export { FetchColorByIdQueryHandler } from "./fetch-color-by-id-query.handler";

import { FetchPaginatedColorsQueryHandler } from "./fetch-paginated-colors-query.handler";
import { FetchColorByIdQueryHandler } from "./fetch-color-by-id-query.handler";

export const ColorsQueryHandlers = [
  FetchPaginatedColorsQueryHandler,
  FetchColorByIdQueryHandler,
];
