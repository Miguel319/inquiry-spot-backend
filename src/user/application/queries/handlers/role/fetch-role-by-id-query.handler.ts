import { RoleTranslations } from "@/user/application/translations";
import { RoleDto } from "@/user/infrastructure/dtos";
import { RoleDtoRepository } from "@/user/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchRoleByIdQuery } from "../..";

@QueryHandler(FetchRoleByIdQuery)
export class FetchRoleByIdQueryHandler
  implements IQueryHandler<FetchRoleByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _roleDtoRepository: RoleDtoRepository,
  ) {}

  async execute({ _id, i18n }: FetchRoleByIdQuery): Promise<RoleDto> {
    const role = await this._roleDtoRepository.getById(_id);

    if (!role)
      throw new NotFoundException(
        i18n
          ? i18n.t(RoleTranslations.NOT_FOUND)
          : this._i18n.t(RoleTranslations.NOT_FOUND),
      );

    return role;
  }
}
