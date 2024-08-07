/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router";
import { middleware } from "./kernel.js";
import AuthController from "#app/auth/controllers/auth_controller";
import RunnersController from "#app/runners/controllers/runners_controller";
import IndexController from "#app/core/controllers/index_controller";
import LanguagesController from "#app/tasks/controllers/languages_controller";
import InvocationController from "#app/tasks/controllers/invocation_controller";
import TaskController from "#app/tasks/controllers/tasks_controller";

router.get("/api/auth/me", [AuthController, "me"]);
router.post("/api/auth/register", [AuthController, "register"]);
router.post("/api/auth/login", [AuthController, "login"]);
router.post("/api/auth/logout", [AuthController, "logout"]);
router.post("/api/auth/socket-token", [AuthController, "socketToken"]);

router
  .group(() => {
    router.get("/api/runners", [RunnersController, "index"]);
    router.get("/api/runners/:id", [RunnersController, "show"]);
    router.post("/api/runners", [RunnersController, "store"]);
  })
  .middleware(middleware.auth());

router.get("/api/languages", [LanguagesController, "index"]);

router
  .group(() => {
    router.post("/api/invocations", [InvocationController, "store"]);
  })
  .middleware(middleware.auth());

router
  .group(() => {
    router.get("/api/tasks/poll", [TaskController, "poll"]);
    router.get("/api/tasks/:taskId", [TaskController, "show"]);
    router.post("/api/tasks/:taskId/take", [TaskController, "take"]);
  })
  .middleware(
    middleware.auth({
      guards: ["runner"],
    })
  );

router.any("/api/*", async ({ request }) => {
  return {
    message: "Route Not Found",
    method: request.method(),
    url: request.url(),
  };
});

router.get("/*", [IndexController, "index"]);
