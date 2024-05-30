import Language from "#app/tasks/models/language";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

export default class extends BaseSeeder {
  async run() {
    await Language.updateOrCreate(
      { id: "cpp17" },
      {
        name: "C++ 17",
        description: "g++ compiler",
        extension: "cpp",
        compileCommand: "g++ --std=c++17 -O2 -o program {source}",
      }
    );
  }
}
