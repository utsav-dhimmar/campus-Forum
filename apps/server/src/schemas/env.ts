import zod from "zod";

const envSchema = zod.object({
  MONGODB_URI: zod.string().nonempty("MONGODB_URI is required"),
  PORT: zod.coerce.number().default(3000),
  REFRESH_TOKEN: zod.string().nonempty("REFRESH_TOKEN is required"),
  ACCESS_TOKEN: zod.string().nonempty("ACCESS_TOKEN is required"),
  ACCESS_TOKEN_EXP: zod.string().nonempty("ACCESS_TOKEN_EXP is required"),
  REFRESH_TOKEN_EXP: zod.string().nonempty("REFRESH_TOKEN_EXP is required"),
  ADMIN_EMAIL: zod.string().nonempty("ADMIN_EMAIL is required"),
  ADMIN_PASSWORD: zod.string().nonempty("ADMIN_PASSWORD is required"),
});

export type Env = zod.infer<typeof envSchema>;

export function parseEnv(env: any): Env {
  return envSchema.parse(env);
}
export const parsedEnv = parseEnv(process.env);
