import path from "path";
import { App } from ".";
import { loadEnvFile } from "./loadEnvFile";
import { getMailRouteAndInjectDependencies } from "./dependencies";

(() => {
  process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! Shutting down...");
    console.log(`${err.name}: ${err.message}`);
    process.exit(1);
  });

  // Nothing in .env, just mocking...
  loadEnvFile(path.join(process.cwd(), ".env"));

  const { app } = new App(getMailRouteAndInjectDependencies());

  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });

  process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! Shutting down...");
    server.close(() => {
      process.exit(1);
    });
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM RECEIVED. Shutting down gracefully");
    server.close(() => {
      console.log("Process terminated!");
    });
  });
})();
