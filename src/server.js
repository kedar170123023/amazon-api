import express from "express";
import config from "../src/config";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routers/userRoute";
import productRoute from "./routers/productRoute";
import bodyParser from "body-parser"
import cors from 'cors';
dotenv.config();
const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => console.log("database connected"));

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);


app.listen(config.PORT, () => {
  console.log(`server runnning at port ${config.PORT}`);
});
