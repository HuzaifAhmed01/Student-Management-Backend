import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import studentRoutes from'./routes/studentRoutes.js'
import { connectDB } from "./db/connection.js";
import cors from 'cors';

dotenv.config();
const app = express();
let host = process.env.HOST;
let user = process.env.USER;
let password = process.env.PASSWORD;
let port = process.env.PORT;
let DBName = process.env.DBNAME;

connectDB(host, user, password, DBName);

//middleware functions

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


/// routes

app.use("/students", studentRoutes);

app.listen(port,() => {
  console.log(`server listening at http://localhost:${port}`);
});
