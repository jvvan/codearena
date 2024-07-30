import { HttpContext } from "@adonisjs/core/http";
import { TaskService } from "../services/task_service.js";
import { inject } from "@adonisjs/core";
import ResourceNotFoundException from "#app/core/errors/resource_not_found_exception";

@inject()
export default class TasksController {
  public constructor(private taskService: TaskService) {}

  public async poll(ctx: HttpContext) {
    const runner = ctx.auth.use("runner").getUserOrFail();
    const limit = ctx.request.input("limit", 3);

    const tasks = await this.taskService.poll(runner, limit);

    return tasks;
  }

  public async show(ctx: HttpContext) {
    const runner = ctx.auth.use("runner").getUserOrFail();
    const task = await this.taskService.findForRunner(
      runner,
      ctx.params.taskId
    );

    if (!task) {
      throw new ResourceNotFoundException("Task");
    }

    return task;
  }

  public async take(ctx: HttpContext) {
    const runner = ctx.auth.use("runner").getUserOrFail();
    const task = await this.taskService.findForRunner(
      runner,
      ctx.params.taskId
    );

    if (!task) {
      throw new ResourceNotFoundException("Task");
    }

    await this.taskService.take(runner, task);

    return {
      message: "Task taken successfully",
    };
  }
}
