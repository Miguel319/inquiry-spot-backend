import { MunicipalityCreatedEvent } from "@/common/application/events";
import { ProvinceTranslations } from "@/common/application/translations";
import { Municipality } from "@/common/domain/entities";
import { MunicipalityFactory } from "@/common/infrastructure/factories";
import {
  MunicipalityEntityRepository,
  ProvinceEntityRepository,
} from "@/common/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Types } from "mongoose";
import { I18nContext, I18nService } from "nestjs-i18n";
import { CreateMunicipalityCommand } from "../..";

@CommandHandler(CreateMunicipalityCommand)
export class CreateMunicipalityCommandHandler
  implements ICommandHandler<CreateMunicipalityCommand>
{
  constructor(
    private readonly municipalityFactory: MunicipalityFactory,
    private readonly _provinceRepository: ProvinceEntityRepository,
    private readonly _municipalityRepository: MunicipalityEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async mapProvince(
    provinceId: string,
    municipality: Municipality,
    i18n: I18nContext,
  ): Promise<void> {
    const province = await this._provinceRepository.findByValue(
      provinceId,
      "_id",
    );

    if (!province)
      throw new NotFoundException(
        i18n
          ? i18n.t(ProvinceTranslations.NOT_FOUND)
          : this._i18n.t(ProvinceTranslations.NOT_FOUND),
      );

    municipality.setProvince({
      _id: new Types.ObjectId(province.getId()),
      value: province.getName(),
    });
  }

  async execute({
    createMunicipalityDto,
    i18n,
  }: CreateMunicipalityCommand): Promise<void> {
    const municipality = this.eventPublisher.mergeObjectContext(
      await this.municipalityFactory.create(createMunicipalityDto, i18n),
    );

    await this.mapProvince(
      createMunicipalityDto.province as unknown as string,
      municipality,
      i18n,
    );

    await this._municipalityRepository.create(municipality);

    municipality.apply(
      new MunicipalityCreatedEvent(
        municipality.getId(),
        municipality.getName(),
      ),
    );

    municipality.commit();
  }
}
