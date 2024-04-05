/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from "#controllers/api/auth_controller";
import RunnersController from "#controllers/api/runners_controller";
import IndexController from "#controllers/index_controller";
import router from "@adonisjs/core/services/router";
import { middleware } from "./kernel.js";

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

router.get("/api/*", async ({ request }) => {
  return {
    message: "Route Not Found",
    method: request.method(),
    url: request.url(),
  };
});

router.get("/*", [IndexController, "index"]);
