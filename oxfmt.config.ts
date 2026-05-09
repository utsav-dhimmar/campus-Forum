import { defineConfig } from "oxfmt";

export default defineConfig({
    ignorePatterns: ["dist/**", "**/pnpm-lock.yaml", "**/.env", "**/.vscode", "**/node_modules"],
});