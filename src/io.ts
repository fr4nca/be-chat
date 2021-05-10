import http from "http";
import { Identifier } from "sequelize/types";
import { Namespace, Server, Socket } from "socket.io";

import Chat from "./models/Chat";

const chatNamespace = (io: Server): Namespace => {
    const chatIo = io.of("/chat");

    chatIo.on("connection", async (socket: Socket) => {
        const { chat } = socket.handshake.query;

        if (chat) {
            try {
                const instance = await Chat.findByPk(chat as Identifier);

                if (instance) {
                    socket.join(chat);
                }

                socket.on("typing", (data) => {
                    socket.to(chat).emit("typing", data);
                });
            } catch (e) {
                console.log(e);
            }
        }
    });

    return chatIo;
};

export default (server: http.Server): Namespace[] => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    const chatIo = chatNamespace(io);

    return [chatIo];
};
