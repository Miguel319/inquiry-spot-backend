import { ColorTranslations } from "@/common/application/translations";
import { ColorDto } from "@/common/infrastructure/dtos";
import { ColorDtoRepository } from "@/common/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchColorByIdQuery } from "../..";

@QueryHandler(FetchColorByIdQuery)
export class FetchColorByIdQueryHandler
  implements IQueryHandler<FetchColorByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _colorDtoRepository: ColorDtoRepository,
  ) {}

  async execute({ _id, i18n }: FetchColorByIdQuery): Promise<ColorDto> {
    const color = await this._colorDtoRepository.getById(_id);

    if (!color)
      throw new NotFoundException(
        i18n
          ? i18n.t(ColorTranslations.NOT_FOUND)
          : this._i18n.t(ColorTranslations.NOT_FOUND),
      );

    return color;
  }
}
