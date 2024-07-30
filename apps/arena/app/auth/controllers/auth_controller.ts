import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import { AuthService } from "../services/auth_service.js";
import {
  authLoginValidator,
  authRegisterValidator,
} from "../validators/auth.js";

@inject()
export default class AuthController {
  public constructor(private authService: AuthService) {}

  public async me({ auth }: HttpContext) {
    await auth.use("web").authenticate();
    return auth.use("web").getUserOrFail();
  }

  public async register({ request }: HttpContext) {
    const payload = await request.validateUsing(authRegisterValidator);

    await this.authService.register(payload);

    return {
      message: "User registered successfully",
    };
  }

  public async login({ auth, request }: HttpContext) {
    const { username, password } = await request.validateUsing(
      authLoginValidator
    );

    const user = await this.authService.attempt(username, password);

    await auth.use("web").login(user);

    return user;
  }

  public async logout({ auth }: HttpContext) {
    await auth.use("web").logout();
  }

  public async socketToken({ auth }: HttpContext) {
    await auth.use("web").authenticate();
    const user = await auth.use("web").getUserOrFail();

    const token = await this.authService.createSocketToken(user);

    return {
      token,
    };
  }
}
