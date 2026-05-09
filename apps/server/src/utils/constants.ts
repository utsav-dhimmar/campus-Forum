import { parsedEnv } from "../schemas/env.js";

const ADMIN = {
  ADMIN_EMAIL: parsedEnv.ADMIN_EMAIL,
  ADMIN_PASSWORD: parsedEnv.ADMIN_PASSWORD,
};
export { ADMIN };
