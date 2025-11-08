import { UsersService } from '@app/users/users.service';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true, name: 'UserExist' })
@Injectable()
export class UserExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(userId: number) {
    const user = await this.usersService.findOne(userId);
    return !!user;
  }

  defaultMessage() {
    return 'User with the given ID does not exist.';
  }
}
