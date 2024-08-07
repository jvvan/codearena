/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from "@adonisjs/core/env";

export default await Env.create(new URL("../", import.meta.url), {
  NODE_ENV: Env.schema.enum(["development", "production", "test"] as const),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  HOST: Env.schema.string({ format: "host" }),
  LOG_LEVEL: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring session package
  |----------------------------------------------------------
  */
  SESSION_DRIVER: Env.schema.enum(["cookie", "memory"] as const),

  /*
  |----------------------------------------------------------
  | Variables for configuring database connection
  |----------------------------------------------------------
  */
  DB_HOST: Env.schema.string({ format: "host" }),
  DB_PORT: Env.schema.number(),
  DB_USER: Env.schema.string(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_DATABASE: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring redis connection
  |----------------------------------------------------------
  */
  REDIS_HOST: Env.schema.string({ format: "host" }),
  REDIS_PORT: Env.schema.number(),

  /*
  |----------------------------------------------------------
  | Variables for configuring drive
  |----------------------------------------------------------
  */
  DRIVE_DEFAULT: Env.schema.enum(["s3"] as const),
  DRIVE_S3_BUCKET: Env.schema.string(),
  DRIVE_S3_REGION: Env.schema.string(),
  DRIVE_S3_ACCESS_KEY_ID: Env.schema.string(),
  DRIVE_S3_SECRET_ACCESS_KEY: Env.schema.string(),
  DRIVE_S3_FORCE_PATH_STYLE: Env.schema.boolean(),

  /*
  |----------------------------------------------------------
  | Variables for configuring the lock package
  |----------------------------------------------------------
  */
  LOCK_STORE: Env.schema.enum(["redis", "memory"] as const),
});
