import { CreateProvinceCommandHandler } from "./create-province-command.handler";
import { UpdateProvinceCommandHandler } from "./update-province-command.handler";
import { DeleteProvinceCommandHandler } from "./delete-province-command.handler";

export { CreateProvinceCommandHandler } from "./create-province-command.handler";
export { UpdateProvinceCommandHandler } from "./update-province-command.handler";
export { DeleteProvinceCommandHandler } from "./delete-province-command.handler";

export const ProvincesCommandHandlers = [
  CreateProvinceCommandHandler,
  UpdateProvinceCommandHandler,
  DeleteProvinceCommandHandler,
];
