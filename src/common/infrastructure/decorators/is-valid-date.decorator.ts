import { VoidDecorator } from "@/domain/types";
import { registerDecorator, ValidationOptions } from "class-validator";

export const IsValidDate = (
  validationOptions?: ValidationOptions,
): VoidDecorator => {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      name: "IsValidDate",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: "The date must be in the format 'YYYY-MM-DD.",
        ...validationOptions,
      },
      validator: {
        validate(value: unknown): boolean {
          const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
          return typeof value === "string" && regex.test(value);
        },
      },
    });
  };
};
