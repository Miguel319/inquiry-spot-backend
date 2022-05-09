import { registerDecorator, ValidationOptions } from "class-validator";

export function MinLength(
  length: number,
  validationOptions?: ValidationOptions,
): Function {
  return function (object: Object, propertyName: string): void {
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
