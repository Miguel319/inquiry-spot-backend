import { ProvinceTranslations } from "@/common/application/translations";
import { ProvinceDto } from "@/common/infrastructure/dtos";
import { ProvinceDtoRepository } from "@/common/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchProvinceByIdQuery } from "../..";

@QueryHandler(FetchProvinceByIdQuery)
export class FetchProvinceByIdQueryHandler
  implements IQueryHandler<FetchProvinceByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _provinceDtoRepository: ProvinceDtoRepository,
  ) {}

  async execute({ _id, i18n }: FetchProvinceByIdQuery): Promise<ProvinceDto> {
    const province = await this._provinceDtoRepository.getById(_id);

    if (!province)
      throw new NotFoundException(
        i18n
          ? i18n.t(ProvinceTranslations.NOT_FOUND)
          : this._i18n.t(ProvinceTranslations.NOT_FOUND),
      );

    return province;
  }
}
