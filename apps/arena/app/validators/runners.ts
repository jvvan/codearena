import vine from "@vinejs/vine";

export const runnersCreateValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(32),
  })
);
