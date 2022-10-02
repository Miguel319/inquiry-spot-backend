import { I18nContext } from "nestjs-i18n";

export interface EntityFactory<TEntity> {
  create(entity: any, i18n?: I18nContext): TEntity | Promise<TEntity>;
}
