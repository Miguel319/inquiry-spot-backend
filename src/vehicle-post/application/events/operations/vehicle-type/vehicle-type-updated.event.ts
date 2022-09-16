export class VehicleTypeUpdatedEvent {
  constructor(
    public readonly vehicleTypeId: string,
    public readonly newName: string,
  ) {}
}
