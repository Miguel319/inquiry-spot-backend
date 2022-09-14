import { I18nContext } from "nestjs-i18n";

export interface IBaseSlugUseCase<T> {
  findAll(): Promise<T[]>;
  findById(_id: string): Promise<T | null>;
  findBySlug(slug: string, i18n: I18nContext): Promise<T>;
  create(entity: T): Promise<T | null>;
  update(slug: string, entity: T, i18n: I18nContext): Promise<T | null>;
  delete(slug: string): Promise<boolean>;
}
