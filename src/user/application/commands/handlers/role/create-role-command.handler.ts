import { RoleFactory } from "@/user/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateRoleCommand } from "../..";

@CommandHandler(CreateRoleCommand)
export class CreateRoleCommandHandler
  implements ICommandHandler<CreateRoleCommand>
{
  constructor(
    private readonly roleFactory: RoleFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createRoleDto, i18n }: CreateRoleCommand): Promise<void> {
    const role = this.eventPublisher.mergeObjectContext(
      await this.roleFactory.create(createRoleDto, i18n),
    );

    role.commit();
  }
}
