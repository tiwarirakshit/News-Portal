import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import * as middlewares from "./middlewares";
import connectDB from "./configs/db.config";
import routes from "./routes/index";
import path from "path";
import cookieParser from "cookie-parser";
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const templatePath = path.join(__dirname, "templates/views");

app.set("view engine", "ejs");
app.set("views", templatePath);

connectDB();

app.use("/admin", routes.adminRoutes);
app.use("/", routes.newsRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
