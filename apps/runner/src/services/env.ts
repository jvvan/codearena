import { Env } from "@adonisjs/env";

const env = await Env.create(new URL("./", import.meta.url), {
  API_URL: Env.schema.string(),
  RUNNER_ID: Env.schema.number(),
  RUNNER_TOKEN: Env.schema.string(),
});

export default env;
