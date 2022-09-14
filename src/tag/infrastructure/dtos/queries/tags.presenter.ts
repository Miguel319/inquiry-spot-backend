import { Tag } from "@/tag/infrastructure/persistence/schemas";
import { ApiProperty } from "@nestjs/swagger";
import { Presenter } from "../../../../common/infrastructure/presenters/base-presenter";

export class TagsPresenter extends Presenter {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  private constructor(tag: Tag) {
    super(tag);

    this.name = tag.name;
    this.slug = tag.slug;
  }

  public static create(tag: Tag): TagsPresenter {
    return new TagsPresenter(tag);
  }
}
