import { RoleTranslations } from "@/user/application/translations";
import { Role } from "@/user/domain/entities";
import {
  UsersRepository,
  RoleEntityRepository,
} from "@/user/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteRoleCommand } from "../..";

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleCommandHandler
  implements ICommandHandler<DeleteRoleCommand>
{
  constructor(
    private readonly _roleEntityRepository: RoleEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _userRepository: UsersRepository,
    private readonly _i18n: I18nService,
  ) {}

  private async getRole(_id: string, i18n: I18nContext): Promise<Role> {
    const role = await this._roleEntityRepository.findByValue(_id, "_id");

    if (!role)
      throw new NotFoundException(
        i18n
          ? i18n.t(RoleTranslations.NOT_FOUND)
          : this._i18n.t(RoleTranslations.NOT_FOUND),
      );

    return role;
  }

  private async handleAuthorization(
    _id: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const userFound = await this._userRepository.findOne({
      _id,
    });

    if (userFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(RoleTranslations.FORBIDDEN_DELETION)
          : this._i18n.t(RoleTranslations.FORBIDDEN_DELETION),
      );
  }

  async execute({ _id, i18n }: DeleteRoleCommand): Promise<boolean> {
    const roleFound = await this.getRole(_id, i18n);

    await this.handleAuthorization(roleFound.getId(), i18n);

    const role = this.eventPublisher.mergeObjectContext(roleFound);

    const deleteCount = await this._roleEntityRepository.delete(_id, "_id");

    role.commit();

    return deleteCount;
  }
}
