import { CustomDecorator, SetMetadata } from "@nestjs/common";

export const HasRoles = (...hasRoles: string[]): CustomDecorator<string> =>
  SetMetadata("roles", hasRoles);
