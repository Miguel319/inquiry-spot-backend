import { Presenter } from "../base-presenter";
import { BlogsPresenter } from "../blogs.presenter";
import { TagsPresenter } from "../../../../tag/infrastructure/dtos/queries/tags.presenter";
import { UserPresenter } from "../users.presenter";
import { Document } from "mongoose";
import { VehiclePostPresenter } from "../../../../vehicle/infrastructure/dtos";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { PaginatedQueryPresenter } from "../pagination-query.presenter";
import { BlogDocument } from "@/blog/infrastructure/persistence/schemas";
import { PropertyPostPresenter } from "@/property/infrastructure/dtos";
import { Tag, TagDocument } from "@/tag/infrastructure/persistence/schemas";
import { User, UserDocument } from "@/user/infrastructure/persistence/schemas";
import { VehiclePost, VehiclePostDocument } from "@/vehicle/domain";
import {
  PropertyPost,
  PropertyPostDocument,
} from "@/property/infrastructure/persistence/schemas";
export { Document } from "mongoose";

type EntityType = "user" | "blog" | "tag" | "vehiclePost" | "propertyPost";

export class PresenterFactory {
  private static handleSingleValue(
    value: unknown,
    type: EntityType,
  ): Presenter | null {
    if (type === "user") return UserPresenter.create(value as User);

    if (type === "blog") return BlogsPresenter.create(value as BlogDocument);

    if (type === "tag") return TagsPresenter.create(value as Tag);

    if (type === "vehiclePost")
      return VehiclePostPresenter.create(value as VehiclePost);

    if (type === "propertyPost")
      return PropertyPostPresenter.create(value as PropertyPost);

    return null;
  }

  private static handleArray(
    values: Document[],
    type: EntityType,
  ): Presenter[] {
    if (values.length > 0) {
      switch (type) {
        case "user":
          return (values as UserDocument[]).map((user) =>
            UserPresenter.create(user),
          );
        case "blog":
          return (values as BlogDocument[]).map((blog) =>
            BlogsPresenter.create(blog),
          );
        case "tag":
          return (values as TagDocument[]).map((tag) =>
            TagsPresenter.create(tag),
          );
        case "vehiclePost":
          return (values as VehiclePostDocument[]).map((tag) =>
            VehiclePostPresenter.create(tag),
          );
        case "propertyPost":
          return (values as PropertyPostDocument[]).map((tag) =>
            PropertyPostPresenter.create(tag),
          );
      }
    }

    return [];
  }

  public static getInstance(
    value: Document | Document[],
    type: EntityType,
    isPaginated = false,
  ): Presenter | Presenter[] | PaginatedQueryPresenter<Document> {
    if (Array.isArray(value)) {
      if (isPaginated)
        return PaginatedQueryPresenter.create(
          value as unknown as PaginatedQuery<Document>,
        );

      return PresenterFactory.handleArray(value, type);
    }

    return this.handleSingleValue(value, type) as Presenter;
  }
}
