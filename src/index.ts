import app from "./app";
import http from "http";

const port = Number(process.env.PORT);

const start = (Port: number) => {
  try {
    let server: http.Server = http.createServer(app).listen(Port);
    server.on("listening", () => {
      console.log(`Listening: http://localhost:${Port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

start(port);
