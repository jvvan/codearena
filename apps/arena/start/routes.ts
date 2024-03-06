/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from "#controllers/auth_controller";
import IndexController from "#controllers/index_controller";
import router from "@adonisjs/core/services/router";

router.get("/api/auth/me", [AuthController, "me"]);
router.post("/api/auth/register", [AuthController, "register"]);
router.post("/api/auth/login", [AuthController, "login"]);
router.post("/api/auth/logout", [AuthController, "logout"]);
router.post("/api/auth/socket-token", [AuthController, "socketToken"]);

router.get("/api/*", async ({ request }) => {
  return {
    message: "Route Not Found",
    method: request.method(),
    url: request.url(),
  };
});

router.get("/*", [IndexController, "index"]);
