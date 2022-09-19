import { RoleTranslations } from "@/user/application/translations";
import { Role } from "@/user/domain/entities";
import { IRole } from "@/user/domain/types";
import { UpdateRoleDto } from "@/user/infrastructure/dtos";
import { RoleEntityRepository } from "@/user/infrastructure/persistence/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateRoleCommand } from "../../operations";

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleCommandHandler
  implements ICommandHandler<UpdateRoleCommand>
{
  constructor(
    private readonly _roleRepository: RoleEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getRole(_id: string, i18n: I18nContext): Promise<Role> {
    const role = await this._roleRepository.findByValue(_id, "_id");

    if (!role)
      throw new NotFoundException(
        i18n
          ? i18n.t(RoleTranslations.NOT_FOUND)
          : this._i18n.t(RoleTranslations.NOT_FOUND),
      );

    return role;
  }

  private async checkDuplicates(
    role: Role,
    updateRoleDto: UpdateRoleDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound = await this._roleRepository.findOneEntity({
      $or: [
        { "name.es": updateRoleDto.name.es },
        { "name.en": updateRoleDto.name.en },
      ],
    });

    const exists = entityFound && entityFound.getId() !== role.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(RoleTranslations.NAME_DUPLICATE)
          : this._i18n.t(RoleTranslations.NAME_DUPLICATE),
      );
  }

  async execute({
    _id,
    updateRoleDto,
    i18n,
  }: UpdateRoleCommand): Promise<void> {
    const roleFound = await this.getRole(_id, i18n);

    await this.checkDuplicates(roleFound, updateRoleDto, i18n);

    const role = this.eventPublisher.mergeObjectContext(roleFound);

    role.updateRole(updateRoleDto as unknown as IRole);

    await this._roleRepository.findOneAndReplaceByValue(_id, "_id", role);

    role.commit();
  }
}
