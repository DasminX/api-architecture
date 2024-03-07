import dotenv from "dotenv";
import path from "path";

export const loadEnvFile = () => {
  dotenv.config({ path: path.join(process.cwd(), ".env") });
};
