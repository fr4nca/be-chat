import cors from "cors";
import express, { Response } from "express";
import http from "http";
import path from "path";

import createIo from "./io";
import chatRoutes from "./routes/chats.routes";
import messageRoutes from "./routes/messages.routes";
import notificationRoutes from "./routes/notifications.routes";
import { IRequest } from "./types/types";

import "./database";
import "./sentry";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

const [chatIo, staffIo, notificationIo, companyIo] = createIo(server);

// pass io connections through to routes
// eslint-disable-next-line consistent-return
app.use((req: IRequest, res: Response, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  req.chatIo = chatIo;
  req.staffIo = staffIo;
  req.notificationIo = notificationIo;
  req.companyIo = companyIo;

  next();
});

// TODO: add validation https://express-validator.github.io/docs/
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/notification", notificationRoutes);

server.listen("3333", () => console.log("Server is running"));
