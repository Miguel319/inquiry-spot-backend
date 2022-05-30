import { VoidDecorator } from "@/domain/types";
import { registerDecorator, ValidationOptions } from "class-validator";

export function MinLength(
  length: number,
  validationOptions?: ValidationOptions,
): VoidDecorator {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: "MinLength",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: `The '${propertyName}' field must have at least ${length} characters.`,
        ...validationOptions,
      },
      validator: {
        validate(value: string): boolean {
          if (value.length === 0) return true;

          return value.length > length;
        },
      },
    });
  };
}
