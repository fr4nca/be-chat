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
                socket.join(chat);

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

const staffNamespace = (io: Server): Namespace => {
    const staffIo = io.of("/staff");

    staffIo.on("connection", async (socket: Socket) => {
        const { isStaff } = socket.handshake.query;
        const room = "staff";

        if (isStaff) socket.join(room);
    });

    return staffIo;
};

const notificationNamespace = (io: Server): Namespace => {
    const notificationIo = io.of("/notification");

    notificationIo.on("connection", async (socket: Socket) => {
        const { uuid } = socket.handshake.query;

        if (uuid) socket.join(uuid);
    });

    return notificationIo;
};

export default (server: http.Server): Namespace[] => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    // eslint-disable-next-line consistent-return
    io.use((socket, next) => {
        if (!socket.handshake.auth.token) {
            return next(new Error("Unauthorized"));
        }
        next();
    });

    const chatIo = chatNamespace(io);
    const staffIo = staffNamespace(io);
    const notificationIo = notificationNamespace(io);

    return [chatIo, staffIo, notificationIo];
};
