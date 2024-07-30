import vine from "@vinejs/vine";

export const createInvocationValidator = vine.compile(
  vine.object({
    languageId: vine.string().trim(),
    code: vine.string().minLength(1),
    input: vine.string().nullable(),
  })
);
