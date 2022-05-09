import { registerDecorator, ValidationOptions } from "class-validator";

export function IsValidEmail(validationOptions?: ValidationOptions): Function {
  return function (object: Object, propertyName: string): void {
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
        validate(value: any): boolean {
          if (value.length === 0) return true;

          const regex: RegExp = /\S+@\S+\.\S+/;

          return typeof value === "string" && regex.test(value);
        },
      },
    });
  };
}
