import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./controller";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, async () => {
  await mongoose.connect(
    process.env.MONGO_URI ?? "mongodb://localhost:27017/store"
  );
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
