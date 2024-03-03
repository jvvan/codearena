import type { HttpContext } from "@adonisjs/core/http";

export default class IndexController {
  public async index({ view }: HttpContext) {
    return view.render("index");
  }
}
