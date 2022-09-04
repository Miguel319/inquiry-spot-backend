import { Tag } from "@/domain/entities/tag.entity";
import { TagsRepository } from "@/infrastructure/repositories";
import { Injectable, NotFoundException } from "@nestjs/common";
import slugify from "slugify";
import { ITagsService } from "../../contracts";

@Injectable()
export class TagsService implements ITagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}
  findById(_id: string): Promise<Tag | null> {
    return this.tagsRepository.findOne({ _id });
  }

  findAll(): Promise<Tag[]> {
    return this.tagsRepository.find({});
  }

  async findBySlug(slug: string): Promise<Tag> {
    const tag: Tag | null = await this.tagsRepository.findOne({ slug });

    if (!tag) throw new NotFoundException("Tag not found.");

    return tag;
  }

  create(entity: Tag): Promise<Tag> {
    const slug: string = slugify(entity.name);

    return this.tagsRepository.create({ ...entity, slug });
  }

  async update(slug: string, entity: Tag): Promise<Tag | null> {
    await this.findBySlug(slug);

    return this.tagsRepository.findOneAndUpdate({ slug }, entity);
  }

  delete(slug: string): Promise<boolean> {
    return this.tagsRepository.deleteOne({ slug });
  }
}
