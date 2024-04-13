import { Infer } from "@vinejs/vine/types";
import User from "../models/user.js";
import { authRegisterValidator } from "../validators/auth.js";
import { EncryptedTokenPayload } from "../types/token.js";
import encryption from "@adonisjs/core/services/encryption";

export class AuthService {
  async register(payload: Infer<typeof authRegisterValidator>) {
    return await User.create(payload);
  }

  async attempt(username: string, password: string) {
    return await User.verifyCredentials(username, password);
  }

  async createSocketToken(user: User) {
    const data: EncryptedTokenPayload = {
      userId: user.id,
      purpose: "socket.io",
    };

    const token = encryption.encrypt(data, "3 minutes");

    return token;
  }
}
