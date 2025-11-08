import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UserIdParamDto } from './dto/user-id.param.dto';

@Controller('users/:userId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Param() { userId }: UserIdParamDto) {
    return this.tasksService.findAllByUserId(userId);
  }
}
