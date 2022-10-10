export { CreatePropertyBuyingOptionCommandHandler } from "./create-property-buying-option-command.handler";
export { UpdatePropertyBuyingOptionCommandHandler } from "./update-property-buying-option-command.handler";
export { DeletePropertyBuyingOptionCommandHandler } from "./delete-property-buying-option-command.handler";

import { CreatePropertyBuyingOptionCommandHandler } from "./create-property-buying-option-command.handler";
import { UpdatePropertyBuyingOptionCommandHandler } from "./update-property-buying-option-command.handler";
import { DeletePropertyBuyingOptionCommandHandler } from "./delete-property-buying-option-command.handler";

export const PropertyBuyingOptionCommandHandlers = [
  CreatePropertyBuyingOptionCommandHandler,
  DeletePropertyBuyingOptionCommandHandler,
  UpdatePropertyBuyingOptionCommandHandler,
];
