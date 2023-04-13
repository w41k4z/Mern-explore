import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import societyRoute from "../routes/society";

const server = express();

// sets up express to accept/parse json bodies
server.use(express.json());

// express error handling requires those parameters even if they are not used
server.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: unknown, req: Request, res: Response, next: NextFunction) => {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error has occurred";
    res.status(500).json({ message: errorMessage });
  }
);

// routes
server.use("/api/society", societyRoute);

export default server;
