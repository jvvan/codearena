import { Env } from "@adonisjs/env";

const env = await Env.create(new URL("./", import.meta.url), {
  RUNNER_ID: Env.schema.number(),
  RUNNER_TOKEN: Env.schema.string(),
});

export default env;
