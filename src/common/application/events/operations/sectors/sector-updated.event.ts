export class SectorUpdatedEvent {
  constructor(
    public readonly sectorId: string,
    public readonly newName: string,
  ) {}
}
