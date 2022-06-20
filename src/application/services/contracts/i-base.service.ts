import { I18nContext } from "nestjs-i18n";

export interface IBaseService<T> {
  findAll(): Promise<T[]>;
  findById(_id: string, i18n?: I18nContext): Promise<T>;
  create?(entity: T): Promise<T>;
  update?(_id: string, entity: T, i18n?: I18nContext): Promise<T | null>;
  delete?(_id: string): Promise<boolean>;
}
