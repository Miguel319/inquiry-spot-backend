import { VoidDecorator } from "@/common/domain/types";
import { registerDecorator, ValidationOptions } from "class-validator";

export const MinLength = (
  length: number,
  validationOptions?: ValidationOptions,
): VoidDecorator => {
  return (object: object, propertyName: string): void => {
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
};
