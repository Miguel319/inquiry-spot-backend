import { I18nContext } from "nestjs-i18n";

export interface EntityFactory<TEntity> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(entity: any, i18n?: I18nContext): TEntity | Promise<TEntity>;
}
