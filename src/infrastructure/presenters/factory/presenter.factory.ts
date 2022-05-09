import { User } from "@/domain/entities/user.entity";
import { Presenter } from "../base-presenter";
import { UserPresenter } from "../users.presenter";

type EntityType = "user";

export class PresenterFactory {
  private static handleSingleValue(
    value: unknown,
    type: EntityType,
  ): Presenter | undefined {
    if (type === "user") return UserPresenter.create(value as User);
  }

  private static handleArray(values: unknown[], type: EntityType): Presenter[] {
    if (values.length > 0) {
      if (type === "user")
        return (values as User[]).map((user) => UserPresenter.create(user));
    }
    return [];
  }

  public static getInstance(
    value: unknown,
    type: EntityType,
  ): Presenter | Presenter[] {
    if (Array.isArray(value)) return PresenterFactory.handleArray(value, type);

    return this.handleSingleValue(value, type) as Presenter;
  }
}
