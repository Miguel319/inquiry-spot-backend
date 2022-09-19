export { FetchPaginatedPropertyBuyingOptionQueryHandler } from "./fetch-paginated-property-buying-option-query.handler";
export { FetchPropertyBuyingOptionByIdQueryHandler } from "./fetch-property-buying-option-by-id-query.handler";

import { FetchPaginatedPropertyBuyingOptionQueryHandler } from "./fetch-paginated-property-buying-option-query.handler";
import { FetchPropertyBuyingOptionByIdQueryHandler } from "./fetch-property-buying-option-by-id-query.handler";

export const PropertyBuyingOptionQueryHandlers = [
  FetchPaginatedPropertyBuyingOptionQueryHandler,
  FetchPropertyBuyingOptionByIdQueryHandler,
];
