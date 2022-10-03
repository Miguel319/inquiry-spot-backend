export class MunicipalityCreatedEvent {
  constructor(
    public readonly municipalityId: string,
    public readonly name: string,
  ) {}
}
