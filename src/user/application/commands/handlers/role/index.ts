export { CreateRoleCommandHandler } from "./create-role-command.handler";
export { UpdateRoleCommandHandler } from "./update-role-command.handler";
export { DeleteRoleCommandHandler } from "./delete-role-command.handler";

import { CreateRoleCommandHandler } from "./create-role-command.handler";
import { UpdateRoleCommandHandler } from "./update-role-command.handler";
import { DeleteRoleCommandHandler } from "./delete-role-command.handler";

export const RoleCommandHandlers = [
  CreateRoleCommandHandler,
  DeleteRoleCommandHandler,
  UpdateRoleCommandHandler,
];
