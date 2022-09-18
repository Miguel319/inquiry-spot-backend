export { CreateTransmissionCommandHandler } from "./create-transmission-command.handler";
export { UpdateTransmissionCommandHandler } from "./update-transmission-command.handler";
export { DeleteTransmissionCommandHandler } from "./delete-transmission-command.handler";

import { CreateTransmissionCommandHandler } from "./create-transmission-command.handler";
import { UpdateTransmissionCommandHandler } from "./update-transmission-command.handler";
import { DeleteTransmissionCommandHandler } from "./delete-transmission-command.handler";

export const TransmissionCommandHandlers = [
  CreateTransmissionCommandHandler,
  UpdateTransmissionCommandHandler,
  DeleteTransmissionCommandHandler,
];
