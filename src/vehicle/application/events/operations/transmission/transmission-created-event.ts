export class TransmissionCreatedEvent {
  constructor(
    public readonly transmissionId: string,
    public readonly name: string,
  ) {}
}
