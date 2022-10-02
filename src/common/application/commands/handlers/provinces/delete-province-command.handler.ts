import { ProvinceTranslations } from "@/common/application/translations";
import { Province } from "@/common/domain/entities";
import { ProvinceEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { PropertyPostsRepository } from "@/real-state/infrastructure/persistence/repositories";
import { VehiclePostsRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteProvinceCommand } from "../..";

@CommandHandler(DeleteProvinceCommand)
export class DeleteProvinceCommandHandler
  implements ICommandHandler<DeleteProvinceCommand>
{
  constructor(
    private readonly _provinceEntityRepository: ProvinceEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _vehiclePostRepository: VehiclePostsRepository,
    private readonly _propertyPostRepository: PropertyPostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  private async getProvince(_id: string, i18n: I18nContext): Promise<Province> {
    const province = await this._provinceEntityRepository.findByValue(
      _id,
      "_id",
    );

    if (!province)
      throw new NotFoundException(
        i18n
          ? i18n.t(ProvinceTranslations.NOT_FOUND)
          : this._i18n.t(ProvinceTranslations.NOT_FOUND),
      );

    return province;
  }

  private async handleAuthorization(
    province: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const vehiclePostFound = await this._vehiclePostRepository.findOne({
      "province._id": province,
    });

    if (vehiclePostFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(ProvinceTranslations.FORBIDDEN_DELETION_VEHICLE)
          : this._i18n.t(ProvinceTranslations.FORBIDDEN_DELETION_VEHICLE),
      );

    const propertyPostFound = await this._propertyPostRepository.findOne({
      "province._id": province,
    });

    if (propertyPostFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(ProvinceTranslations.FORBIDDEN_DELETION_PROPERTY)
          : this._i18n.t(ProvinceTranslations.FORBIDDEN_DELETION_PROPERTY),
      );
  }

  async execute({ _id, i18n }: DeleteProvinceCommand): Promise<boolean> {
    const provinceFound = await this.getProvince(_id, i18n);

    await this.handleAuthorization(provinceFound.getId(), i18n);

    const province = this.eventPublisher.mergeObjectContext(provinceFound);

    const deleteCount = await this._provinceEntityRepository.delete(_id, "_id");

    province.commit();

    return deleteCount;
  }
}
