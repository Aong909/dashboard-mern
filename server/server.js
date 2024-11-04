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

// app.use(
//   cors({
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   })
// );

// app.options("*", cors);

// app.options("*", cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   })
// );

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "PUT, GET, PATCH, POST, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

///////////////////////////////////////
// test resolve by copilot
// CORS configuration
const corsOptions = {
  origin: "*", // Adjust this according to your needs
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], // Adjust headers as needed
};
app.use(cors(corsOptions));
app.use(express.json());
///////////////////////////////////////

app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));

app
  .get("/", (req, res) => {
    res.send("Hello GET API");
  })
  .post("/", (req, res) => {
    res.send("Hello POST API");
  });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);

///////////////////////////////
//test resolve by copilot
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,DELETE,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204); // Or 204
});

///////////////////////////////
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
