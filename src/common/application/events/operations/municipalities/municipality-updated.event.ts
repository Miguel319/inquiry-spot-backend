export class MunicipalityUpdatedEvent {
  constructor(
    public readonly municipalityId: string,
    public readonly newName: string,
  ) {}
}
