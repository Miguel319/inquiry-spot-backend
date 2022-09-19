export { FetchPaginatedRolesQueryHandler } from "./fetch-paginated-roles-query.handler";
export { FetchRoleByIdQueryHandler } from "./fetch-role-by-id-query.handler";

import { FetchPaginatedRolesQueryHandler } from "./fetch-paginated-roles-query.handler";
import { FetchRoleByIdQueryHandler } from "./fetch-role-by-id-query.handler";

export const RolesQueryHandlers = [
  FetchPaginatedRolesQueryHandler,
  FetchRoleByIdQueryHandler,
];
