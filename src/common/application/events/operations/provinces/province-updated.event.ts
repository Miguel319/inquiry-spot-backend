export class ProvinceUpdatedEvent {
  constructor(
    public readonly provinceId: string,
    public readonly newName: string,
  ) {}
}
