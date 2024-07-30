import env from "#services/env.js";

export default {
  url: env.get("API_URL"),
  id: env.get("RUNNER_ID"),
  token: env.get("RUNNER_TOKEN"),
};
