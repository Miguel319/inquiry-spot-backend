export class SectorCreatedEvent {
  constructor(public readonly sectorId: string, public readonly name: string) {}
}
