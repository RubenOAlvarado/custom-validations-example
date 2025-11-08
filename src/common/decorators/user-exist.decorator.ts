import { registerDecorator, ValidationOptions } from 'class-validator';
import { UserExistConstraint } from '../constraints/user-exist.constraint';

export function UserExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      async: true,
      propertyName,
      options: validationOptions,
      validator: UserExistConstraint,
    });
  };
}
