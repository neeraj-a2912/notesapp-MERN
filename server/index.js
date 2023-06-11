import express from "express";
import connectToMongo from "./connection.js";
import userRouter from "./routes/userRoutes.js";
import noteRouter from "./routes/noteRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
const port = process.env.PORT;
connectToMongo();
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", noteRouter);

app.listen(port, () => {
  console.log(`App Running at http://localhost:${port}`);
});
