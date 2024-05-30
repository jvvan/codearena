import Language from "../models/language.js";

export default class LanguagesController {
  public async index() {
    return Language.all();
  }
}
