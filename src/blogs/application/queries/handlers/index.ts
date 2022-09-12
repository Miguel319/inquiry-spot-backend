export { FetchPaginatedBlogsQueryHandler } from "./fetch-paginated-blog-query.handler";
export { FetchBlogBySlugQueryHandler } from "./fetch-blog-slug-query.handler";

import { FetchPaginatedBlogsQueryHandler } from "./fetch-paginated-blog-query.handler";
import { FetchBlogBySlugQueryHandler } from "./fetch-blog-slug-query.handler";

export const BlogQueryHandlers = [
  FetchPaginatedBlogsQueryHandler,
  FetchBlogBySlugQueryHandler,
];
