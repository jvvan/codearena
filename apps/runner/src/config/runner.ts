import env from "#services/env.js";

export default {
  id: env.get("RUNNER_ID"),
  token: env.get("RUNNER_TOKEN"),
};
