import http from "http";
import { Identifier } from "sequelize/types";
import { Server, Socket } from "socket.io";

import Chat from "./models/Chat";
import { IIoServers } from "./types/types";

export default (server: http.Server): IIoServers => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    const chatIo = io.of("/chat");
    const notificationIo = io.of("/notification");

    chatIo.on("connection", async (socket: Socket) => {
        const { chat } = socket.handshake.query;

        if (chat) {
            try {
                const instance = await Chat.findByPk(chat as Identifier);

                if (instance) {
                    socket.join(chat);
                }
            } catch (e) {
                console.log(e);
            }
        }
    });

    notificationIo.on("connection", async (socket: Socket) => {
        const { user_uuid } = socket.handshake.query;

        if (user_uuid) {
            socket.join(user_uuid);
        }
    });

    return {
        chatIo,
        notificationIo,
    };
};
