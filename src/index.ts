import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import mailRouter from "./features/mail/route/mail.route";
import { notFoundController } from "./features/_shared/controller/notFound.controller";
import { errorController } from "./features/_shared/controller/error.controller";

export const createApp = () => {
  /* Initialization */
  const app = express();

  /* Configuring behaviour */
  app.options("*", cors());
  app.use(helmet());

  let morganMode = "combined";
  if (process.env.NODE_ENV === "development") {
    morganMode = "dev";
  }
  app.use(morgan(morganMode));

  app.use(express.json({ limit: "10kb" }));
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(compression());

  /* Routes */
  app.use("/api/mail", mailRouter);

  app.all("*", notFoundController);

  app.use(errorController);

  return app;
};
