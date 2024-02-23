import dotenv from "dotenv";

export const loadEnvFile = (path: string) => {
  dotenv.config({ path });
};
