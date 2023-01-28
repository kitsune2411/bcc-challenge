import express, { Request, Response, NextFunction, Application } from "express";

import * as dotenv from "dotenv";
import router from "./routes";
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/v1", router);

const PORT: string = process.env.PORT || "3000";
app.listen(PORT, (): void => {
  console.log(`listening to | http://localhost:${PORT}`);
});
