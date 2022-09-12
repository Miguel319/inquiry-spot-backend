import { IBaseEntity } from "@/common/domain/types";

export interface IPostedBy {
  _id: string;
  name: string;
}

export interface IBlog extends IBaseEntity {
  readonly title: string;
  slug: string;
  readonly body: string;
  excerpt: string;
  mtitle: string;
  mdescription: string;
  readonly photo: string;
  readonly category: string;
  readonly tags: string[];
  readonly postedBy: IPostedBy;
}
