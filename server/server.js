import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./mongodb/connect.js";

import userRouter from "./router/user.routes.js";
import propertyRouter from "./router/property.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT | 8080;

app.options("*", cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, PATCH, POST, DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.options("*", (req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);
  next();
});

app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));

app
  .get("/", (req, res) => {
    res.send("Hello GET API");
  })
  .patch("/", (req, res) => {
    res.send("Hello PATCH API");
  });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log("server is running on port", port);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
