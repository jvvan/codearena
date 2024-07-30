import User from "#app/auth/models/user";
import { drive } from "#app/core/services/drive";
import db from "@adonisjs/lucid/services/db";
import { randomUUID } from "crypto";
import { InvocationStatus } from "../types/invocation.js";
import Task from "../models/task.js";
import { TaskStatus, TaskType } from "../types/task.js";

export interface CreateInvocationPayload {
  languageId: string;
  code: string;
  input: string | null;
}

export class InvocationService {
  async create(user: User, payload: CreateInvocationPayload) {
    const trx = await db.transaction();

    try {
      const invocation = await user.related("invocations").create(
        {
          id: randomUUID(),
          code: payload.code,
          languageId: payload.languageId,
          status: InvocationStatus.pending,
        },
        { client: trx }
      );

      await Task.create(
        {
          id: invocation.id,
          type: TaskType.invocation,
          status: TaskStatus.queued,
        },
        {
          client: trx,
        }
      );

      if (payload.input) {
        await this.createInvocationStream(
          invocation.id,
          "stdin",
          payload.input
        );
      }

      await trx.commit();

      return invocation;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async createInvocationStream(
    invocationId: string,
    name: string,
    content: string
  ) {
    const path = `invocations/${invocationId}/${name}`;
    await drive.use().put(path, content);
  }

  async listInvocationStreams(invocationId: string) {
    const path = `invocations/${invocationId}`;
    const { objects } = await drive.use().listAll(path);
    const files = Array.from(objects).filter((r) => r.isFile);

    return files.map((r) => r.name);
  }
}
