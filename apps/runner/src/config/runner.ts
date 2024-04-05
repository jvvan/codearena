import env from "#services/env";

export default {
  id: env.get("RUNNER_ID"),
  token: env.get("RUNNER_TOKEN"),
};
