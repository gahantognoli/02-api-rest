import { env } from "./env";
import { app } from "./app";

app
  .listen({
    port: env.PORT,
    host: env.NODE_ENV === "development" ? "localhost" : "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
