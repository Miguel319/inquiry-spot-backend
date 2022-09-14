import { TagsRepository } from "@/tag/infrastructure/persistence/repositories";
import { Tag } from "@/tag/infrastructure/persistence/schemas";
import { Injectable, NotFoundException } from "@nestjs/common";
import { I18nContext, I18nService } from "nestjs-i18n";
import slugify from "slugify";
import { TagTranslations } from "../../translations";
import { ITagsService } from "../contracts";

@Injectable()
export class TagsService implements ITagsService {
  constructor(
    private readonly _tagsRepository: TagsRepository,
    private readonly _i18n: I18nService,
  ) {}
  findById(_id: string): Promise<Tag | null> {
    return this._tagsRepository.findOne({ _id });
  }

  findAll(): Promise<Tag[]> {
    return this._tagsRepository.find({});
  }

  async findBySlug(slug: string, i18n: I18nContext): Promise<Tag> {
    const tag: Tag | null = await this._tagsRepository.findOne({ slug });

    if (!tag)
      throw new NotFoundException(
        i18n
          ? i18n.t(TagTranslations.NOT_FOUND)
          : this._i18n.t(TagTranslations.NOT_FOUND),
      );

    return tag;
  }

  create(entity: Tag): Promise<Tag> {
    const slug: string = slugify(entity.name);

    return this._tagsRepository.create({ ...entity, slug });
  }

  async update(
    slug: string,
    entity: Tag,
    i18n: I18nContext,
  ): Promise<Tag | null> {
    await this.findBySlug(slug, i18n);

    return this._tagsRepository.findOneAndUpdate({ slug }, entity);
  }

  delete(slug: string): Promise<boolean> {
    return this._tagsRepository.deleteOne({ slug });
  }
}
