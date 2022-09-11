import { IBaseEntity } from "@/common/domain/types";

export interface IBlog extends IBaseEntity {
  readonly title: string;
  readonly slug: string;
  readonly body: string;
  readonly excerpt: string;
  readonly mtitle: string;
  readonly mdescription: string;
  readonly photo: string;
  readonly category: string;
  readonly tags: string[];
  readonly postedBy: string;
}
