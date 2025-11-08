import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from '@app/users/users.module';
import { UserExistConstraint } from '@common/constraints/user-exist.constraint';

@Module({
  imports: [UsersModule],
  controllers: [TasksController],
  providers: [TasksService, UserExistConstraint],
})
export class TasksModule {}
