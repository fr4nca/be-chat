import cors from "cors";
import express from "express";
import http from "http";
import path from "path";

import createIo from "./io";
import chatRoutes from "./routes/chats.routes";
import messageRoutes from "./routes/messages.routes";
import { IRequest } from "./types/request";

import "./database";

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const { chatIo, notificationIo } = createIo(server);

app.use((req: IRequest, res, next) => {
    req.chatIo = chatIo;
    req.notificationIo = notificationIo;
    next();
});

app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

server.listen("3333", () => console.log("Server is running"));
