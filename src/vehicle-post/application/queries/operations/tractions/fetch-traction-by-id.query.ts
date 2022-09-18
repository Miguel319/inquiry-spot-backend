import { I18nContext } from "nestjs-i18n/dist/i18n.context";

export class FetchTractionByIdQuery {
  constructor(public readonly _id: string, public readonly i18n: I18nContext) {}
}
