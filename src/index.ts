import app from "./app";
import express from "express";
const server = express();

const port = Number(process.env.PORT);

const start = (Port: number) => {
  try {
    server.use(app);
    server.listen(Port, () => {
      console.log(`Server running on port ${Port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

start(port);
