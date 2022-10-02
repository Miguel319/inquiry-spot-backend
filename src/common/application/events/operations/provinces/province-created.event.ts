export class ProvinceCreatedEvent {
  constructor(
    public readonly provinceId: string,
    public readonly name: string,
  ) {}
}
