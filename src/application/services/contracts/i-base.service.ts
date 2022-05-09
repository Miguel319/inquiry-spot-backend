export interface IBaseService<T> {
  findAll(): Promise<T[]>;
  findById(_id: string): Promise<T>;
  create?(entity: T): Promise<T>;
  update?(_id: string, entity: T): Promise<T | null>;
  delete?(_id: string): Promise<boolean>;
}
