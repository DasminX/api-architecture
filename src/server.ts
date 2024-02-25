import { loadEnvFile } from "./loadEnvFile";
import { App } from "./app";
import { createAwilixContainer } from "./container";

(() => {
  const container = createAwilixContainer();

  loadEnvFile(); // Nothing in .env, just mocking...

  process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log(`UNCAUGHT EXCEPTION! Shutting down...`);
    process.exit(1);
  });

  const { app } = new App(container.cradle.mailRoute);

  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });

  process.on("unhandledRejection", (err) => {
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
