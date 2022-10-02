import { ProvinceUpdatedEvent } from "@/common/application/events";
import { ProvinceTranslations } from "@/common/application/translations";
import { Province } from "@/common/domain/entities";
import { IProvince } from "@/common/domain/types";
import { UpdateProvinceDto } from "@/common/infrastructure/dtos";
import { ProvinceEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateProvinceCommand } from "../../operations";

@CommandHandler(UpdateProvinceCommand)
export class UpdateProvinceCommandHandler
  implements ICommandHandler<UpdateProvinceCommand>
{
  constructor(
    private readonly _provinceRepository: ProvinceEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getProvince(_id: string, i18n: I18nContext): Promise<Province> {
    const province = await this._provinceRepository.findByValue(_id, "_id");

    if (!province)
      throw new NotFoundException(
        i18n
          ? i18n.t(ProvinceTranslations.NOT_FOUND)
          : this._i18n.t(ProvinceTranslations.NOT_FOUND),
      );

    return province;
  }

  private async checkDuplicates(
    province: Province,
    updateProvinceDto: UpdateProvinceDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound = await this._provinceRepository.findOneEntity({
      $or: [
        { "name.es": updateProvinceDto.name.es },
        { "name.en": updateProvinceDto.name.en },
      ],
    });

    const exists = entityFound && entityFound.getId() !== province.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(ProvinceTranslations.NAME_DUPLICATE)
          : this._i18n.t(ProvinceTranslations.NAME_DUPLICATE),
      );
  }

  async execute({
    _id,
    updateProvinceDto,
    i18n,
  }: UpdateProvinceCommand): Promise<void> {
    const provinceFound = await this.getProvince(_id, i18n);

    await this.checkDuplicates(provinceFound, updateProvinceDto, i18n);

    const province = this.eventPublisher.mergeObjectContext(provinceFound);

    province.updateProvince(updateProvinceDto as unknown as IProvince);

    province.apply(
      new ProvinceUpdatedEvent(province.getId(), province.getName()),
    );

    await this._provinceRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      province,
    );

    province.commit();
  }
}
