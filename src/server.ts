import cors from "cors";
import express from "express";
import http from "http";
import path from "path";

import createIo from "./io";
import chatRoutes from "./routes/chats.routes";
import messageRoutes from "./routes/messages.routes";
import { IRequest } from "./types/types";

import "./database";
import "./sentry";

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const [chatIo] = createIo(server);

// pass io connections through to routes
app.use((req: IRequest, _, next) => {
    req.chatIo = chatIo;

    next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

server.listen("3333", () => console.log("Server is running"));
