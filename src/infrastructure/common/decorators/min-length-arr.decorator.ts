import { VoidDecorator } from "@/domain/types";
import { registerDecorator, ValidationOptions } from "class-validator";

export const MinLengthArray = (
  length: number,
  validationOptions?: ValidationOptions,
): VoidDecorator => {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      name: "MinLengthArray",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: `The '${propertyName}' field must have at least ${length} values.`,
        ...validationOptions,
      },
      validator: {
        validate(values: string[]): boolean {
          if (values && !values[0]) return false;

          return values.length >= length;
        },
      },
    });
  };
};
