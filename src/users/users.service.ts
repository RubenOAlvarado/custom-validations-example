import { DrizzleClient } from '@app/common/database/drizzle.client';
import { DRIZZLE } from '@app/common/database/drizzle.module';
import { users } from '@app/common/database/schemas';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private readonly drizzle: DrizzleClient) {}

  findOne(id: number) {
    return this.drizzle.query.users.findFirst({ where: eq(users.id, id) });
  }
}
