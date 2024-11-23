import connectToDb from "./config/database.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from './routes/user.routes.js'
import generateRouter from "./routes/generateimage.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 4000
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use('/api/v1/user', userRouter)
app.use('/api/v1/image', generateRouter)


connectToDb()
  .then(() => {
    console.log("Database connection established");
    app.listen(PORT, () => {
      console.log(
        `server started at http://localhost:${process.env.SERVER_PORT}/api/v1`
      );
    });
  })
  .catch((error) => {
    console.log("Error connecting to database");
    console.log(error);
  });