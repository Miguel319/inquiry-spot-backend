export abstract class BaseRepoMock<T> {
  protected abstract entityStub: T;

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }

  constructorSpy(_createEntityData: T): void {
    _createEntityData;
    return;
  }

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub,
    };
  }

  async find(): Promise<T[]> {
    return [this.entityStub, this.entityStub];
  }

  async paginate(): Promise<T[]> {
    return [this.entityStub, this.entityStub];
  }

  async save(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }

  async deleteOne(): Promise<boolean> {
    return false;
  }
  async deleteMany(): Promise<boolean> {
    return false;
  }
}
