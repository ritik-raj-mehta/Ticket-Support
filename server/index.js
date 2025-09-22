import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routerTicket from "./routers/ticketRoute.js";
import cors from "cors";

const app = express();

app.use(bodyParser.json())
dotenv.config();

const PORT = process.env.PORT ;
const MongoURL = process.env.MONGO_URL;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(MongoURL)
  .then(() => {
    console.log(`Mongodb is connected successfully`);
    app.listen(PORT, () => {
      console.log(`Server is connected at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/ticket", routerTicket);



