import server from "./core/server";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const startApp = (url: string, port: number) => {
  mongoose
    .connect(url)
    .then(() => {
      server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch(console.error);
};

const port = env.PORT;
const mongoURI = env.MONGO_CONNECTION_STRING;
startApp(mongoURI, port);
