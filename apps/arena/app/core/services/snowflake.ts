import { Snowflake } from "@sapphire/snowflake";

const EPOCH = "2020-01-01T00:00:00.000Z";
const snowflake = new Snowflake(new Date(EPOCH));

export { snowflake };
