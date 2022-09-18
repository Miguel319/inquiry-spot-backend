import { TransmissionTranslations } from "@/vehicle-post/application/translations";
import { TransmissionDto } from "@/vehicle-post/infrastructure/dtos";
import { TransmissionDtoRepository } from "@/vehicle-post/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchTransmissionByIdQuery } from "../..";

@QueryHandler(FetchTransmissionByIdQuery)
export class FetchTransmissionByIdQueryHandler
  implements IQueryHandler<FetchTransmissionByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _transmissionDtoRepository: TransmissionDtoRepository,
  ) {}

  async execute({
    _id,
    i18n,
  }: FetchTransmissionByIdQuery): Promise<TransmissionDto> {
    const transmission = await this._transmissionDtoRepository.getById(_id);

    if (!transmission)
      throw new NotFoundException(
        i18n
          ? i18n.t(TransmissionTranslations.NOT_FOUND)
          : this._i18n.t(TransmissionTranslations.NOT_FOUND),
      );

    return transmission;
  }
}
