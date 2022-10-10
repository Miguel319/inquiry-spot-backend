export { FetchPaginatedPropertyPostsQueryHandler } from "./fetch-paginated-property-posts-query.handler";
export { FetchPropertyPostByIdQueryHandler } from "./fetch-property-post-by-id-query.handler";

import { FetchPaginatedPropertyPostsQueryHandler } from "./fetch-paginated-property-posts-query.handler";
import { FetchPropertyPostByIdQueryHandler } from "./fetch-property-post-by-id-query.handler";

export const PropertyPostsQueryHandlers = [
  FetchPaginatedPropertyPostsQueryHandler,
  FetchPropertyPostByIdQueryHandler,
];
