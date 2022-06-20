import { PropertyPost } from "@/domain/entities";
import { PropertyPostsRepository } from "../../../../infrastructure/repositories";
import { Injectable, NotFoundException } from "@nestjs/common";
import { IPropertyPostsService } from "../../contracts";
import { I18nContext, I18nService } from "nestjs-i18n";

@Injectable()
export class PropertyPostsService implements IPropertyPostsService {
  constructor(
    private readonly _propertyPostRepo: PropertyPostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  async findAll(): Promise<PropertyPost[]> {
    return await this._propertyPostRepo.find({});
  }

  async findById(_id: string, i18n?: I18nContext): Promise<PropertyPost> {
    const propertyPost: PropertyPost | null =
      await this._propertyPostRepo.findOne({ _id });

    if (!propertyPost)
      throw new NotFoundException(
        i18n
          ? i18n.t("validations.propertyPost.notFound")
          : this._i18n.t("validations.propertyPost.notFound"),
      );

    return propertyPost;
  }

  async create(propertyPost: PropertyPost): Promise<PropertyPost> {
    return await this._propertyPostRepo.create(propertyPost);
  }

  async update(
    _id: string,
    propertyPost: PropertyPost,
    i18n?: I18nContext,
  ): Promise<PropertyPost | null> {
    await this.findById(_id, i18n); // Throws error if not found

    return await this._propertyPostRepo.findOneAndUpdate({ _id }, propertyPost);
  }

  async delete(_id: string): Promise<boolean> {
    return await this._propertyPostRepo.deleteOne({ _id });
  }

  async findFromSeller(_id: string, i18n?: I18nContext): Promise<PropertyPost> {
    const propertyPost: PropertyPost | null =
      await this._propertyPostRepo.findOne({ seller: _id });

    if (!propertyPost)
      throw new NotFoundException(
        i18n
          ? i18n.t("validations.propertyPost.notFound")
          : this._i18n.t("validations.propertyPost.notFound"),
      );

    return propertyPost;
  }
}
