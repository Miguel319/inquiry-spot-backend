export class VehicleTypeCreatedEvent {
  constructor(
    public readonly vehicleTypeId: string,
    public readonly name: string,
  ) {}
}
