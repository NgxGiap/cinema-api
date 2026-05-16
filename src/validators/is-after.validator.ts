import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsAfter(
  property: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: object, propertyName: string | symbol): void => {
    registerDecorator({
      name: 'isAfter',
      target: object.constructor,
      propertyName: propertyName.toString(),
      constraints: [property],
      options: validationOptions,

      validator: {
        validate(value: string, args: ValidationArguments): boolean {
          const [relatedProp] = args.constraints as string[];

          const relatedValue = (args.object as Record<string, string>)[relatedProp];

          if (!relatedValue || !value) {
            return false;
          }

          return new Date(value) > new Date(relatedValue);
        },

        defaultMessage(args: ValidationArguments): string {
          const [relatedProp] = args.constraints as string[];

          return `${args.property} phải sau ${relatedProp}`;
        },
      },
    });
  };
}
