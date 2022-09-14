import { VoidDecorator } from "@/common/domain/types";
import { registerDecorator, ValidationOptions } from "class-validator";

export function IsNotEmpty(
  validationOptions?: ValidationOptions,
): VoidDecorator {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: "IsNotEmpty",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: `The '${propertyName}' field is required.`,
        ...validationOptions,
      },
      validator: {
        validate(value: unknown): boolean {
          if (!value) return false;

          if (typeof value === "string") return value.length > 0;

          return Boolean(value);
        },
      },
    });
  };
}
