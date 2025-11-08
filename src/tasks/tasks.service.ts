import { Inject, Injectable } from '@nestjs/common';
import { tasks } from '@app/common/database/schemas';
import { DrizzleClient } from '@app/common/database/drizzle.client';
import { DRIZZLE } from '@app/common/database/drizzle.module';
import { eq } from 'drizzle-orm';

@Injectable()
export class TasksService {
  constructor(@Inject(DRIZZLE) private readonly drizzle: DrizzleClient) {}

  findAllByUserId(userId: number) {
    return this.drizzle.query.tasks.findMany({
      where: eq(tasks.userId, userId),
      with: { user: true },
    });
  }
}
