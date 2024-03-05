import User from "#models/user";
import { authLoginValidator, authRegisterValidator } from "#validators/auth";
import type { HttpContext } from "@adonisjs/core/http";

export default class AuthController {
  public async me({ auth }: HttpContext) {
    await auth.authenticate();
    return auth.use("web").getUserOrFail();
  }

  public async register({ request }: HttpContext) {
    const payload = await request.validateUsing(authRegisterValidator);

    await User.create(payload);

    return {
      message: "User registered successfully",
    };
  }

  public async login({ auth, request }: HttpContext) {
    const { username, password } = await request.validateUsing(
      authLoginValidator
    );

    const user = await User.verifyCredentials(username, password);

    await auth.use("web").login(user);

    return user;
  }

  public async logout({ auth }: HttpContext) {
    await auth.use("web").logout();
  }
}
