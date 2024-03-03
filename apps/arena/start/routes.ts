/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import IndexController from "#controllers/index_controller";
import router from "@adonisjs/core/services/router";

router.get("/api/*", async ({ request }) => {
  return {
    message: "Route Not Found",
    status: 404,
    method: request.method(),
    url: request.url(),
  };
});

router.get("/*", [IndexController, "index"]);
