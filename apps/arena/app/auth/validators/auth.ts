import vine from "@vinejs/vine";

export const authLoginValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    password: vine.string(),
  })
);

export const authRegisterValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(32)
      .alphaNumeric({ allowUnderscores: true })
      .unique(async (db, value) => {
        const user = await db.from("users").where("username", value).first();
        return !user;
      }),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from("users").where("email", value).first();
        return !user;
      })
      .optional(),
    password: vine.string().minLength(8).maxLength(256),
  })
);
