import { Config, ConfigLoader } from "@adonisjs/config";

const loader = new ConfigLoader(new URL("../config", import.meta.url));
const config = new Config(await loader.load());

export default config;
