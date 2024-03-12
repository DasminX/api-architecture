import { loadEnvFile } from "./config/loadEnvFile";
import { createAwilixContainer } from "./container";

(() => {
  process.on("uncaughtException", err => {
    console.log(err.name, err.message);
    console.log(`UNCAUGHT EXCEPTION! Shutting down...`);
    process.exit(1);
  });

  loadEnvFile();
  const container = createAwilixContainer();

  const port = process.env.PORT || 3000;

  const server = container.cradle.appEntry.app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });

  process.on("unhandledRejection", err => {
    console.log(err);
    console.log(`UNHANDLED REJECTION! Shutting down...`);
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
