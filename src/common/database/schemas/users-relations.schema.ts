import { relations } from 'drizzle-orm';
import { tasks } from './tasks.schema';
import { users } from './user.schema';

export const userRelations = relations(users, ({ many }) => ({
  tasks: many(tasks, { relationName: 'user_tasks' }),
}));
