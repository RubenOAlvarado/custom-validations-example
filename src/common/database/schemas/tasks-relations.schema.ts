import { relations } from 'drizzle-orm';
import { tasks } from './tasks.schema';
import { users } from './user.schema';

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
    relationName: 'user_tasks',
  }),
}));
