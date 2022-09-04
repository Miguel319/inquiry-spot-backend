export interface IBaseSlugUseCase<T> {
  findAll(): Promise<T[]>;
  findById(_id: string): Promise<T | null>;
  findBySlug(slug: string): Promise<T>;
  create(entity: T): Promise<T | null>;
  update(slug: string, entity: T): Promise<T | null>;
  delete(slug: string): Promise<boolean>;
}
