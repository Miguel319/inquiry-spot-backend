import { IPostedBy } from "@/blog/domain/types";
import { BaseDto } from "@/common/infrastructure/dtos";

export class BlogDto extends BaseDto {
  readonly title: string;
  readonly slug: string;
  readonly body: string;
  readonly excerpt: string;
  readonly mtitle: string;
  readonly mdescription: string;
  readonly photo: string;
  readonly category: string;
  readonly tags: string[];
  readonly postedBy: IPostedBy;
}
