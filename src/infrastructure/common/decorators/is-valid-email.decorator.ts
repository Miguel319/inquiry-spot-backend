import { VoidDecorator } from "@/domain/types";
import { registerDecorator, ValidationOptions } from "class-validator";

export function IsValidEmail(
  validationOptions?: ValidationOptions,
): VoidDecorator {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: "IsValidEmail",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: "Invalid email.",
        ...validationOptions,
      },
      validator: {
        validate(value: string[]): boolean {
          if (value.length === 0) return true;

          const regex = /\S+@\S+\.\S+/;

          return typeof value === "string" && regex.test(value);
        },
      },
    });
  };
}
