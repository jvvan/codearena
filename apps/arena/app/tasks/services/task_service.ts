import locks from "@adonisjs/lock/services/main";
import Runner from "#app/runners/models/runner";
import TaskAlreadyTakenException from "../errors/task_already_taken_exception.js";
import Task from "../models/task.js";
import { TaskStatus } from "../types/task.js";

export class TaskService {
  public async findForRunner(runner: Runner, taskId: string) {
    const task = await Task.query()
      .where("id", taskId)
      .where("runnerId", runner.id)
      .orWhereNull("runnerId")
      .first();

    return task;
  }

  public async poll(_runner: Runner, limit: number = 3) {
    /**
     * Just a placeholder implementation
     * Needs to check runner permissions, settings, languages, etc.
     */

    const tasks = await Task.query()
      .where("status", TaskStatus.queued)
      .limit(limit);

    return tasks;
  }

  public async take(runner: Runner, task: Task) {
    if (task.runnerId) {
      throw new TaskAlreadyTakenException();
    }

    const lock = await locks.createLock(`task:${task.id}:take`);
    const acquired = await lock.acquire();
    if (!acquired) {
      throw new TaskAlreadyTakenException();
    }

    try {
      task.runnerId = runner.id;
      task.status = TaskStatus.running;
      await task.save();
    } finally {
      await lock.release();
    }
  }
}
