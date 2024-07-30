import { defineConfig } from "@adonisjs/auth";
import { InferAuthEvents, Authenticators } from "@adonisjs/auth/types";
import { sessionGuard, sessionUserProvider } from "@adonisjs/auth/session";
import { RunnerGuard } from "#app/auth/guards/runner_guard";

const authConfig = defineConfig({
  default: "web",
  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import("#app/auth/models/user"),
      }),
    }),
    runner: (ctx) => {
      return new RunnerGuard(ctx);
    },
  },
});

export default authConfig;

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module "@adonisjs/auth/types" {
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module "@adonisjs/core/types" {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
