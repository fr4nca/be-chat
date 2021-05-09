import { Response } from "express";

import Chat from "../models/Chat";
import Message from "../models/Message";
import { IRequest } from "../types/types";

export default {
    async store(req: IRequest, res: Response): Promise<Response> {
        const {
            text,
            author_uuid,
            author_name,
            author_email,
            chat_id,
        } = req.body;
        const { file } = req;

        // TODO: save full domain path
        const filePath = file?.filename;

        try {
            const message = await Message.create({
                text,
                author_uuid,
                author_name,
                author_email,
                chat_id,
                file: filePath,
            });

            req.chatIo?.to(chat_id).emit("message", {
                message,
            });

            const chat = await Chat.findByPk(chat_id);
            if (chat?.responsible_uuid) {
                let to = "";

                if (author_uuid === chat.owner_uuid)
                    to = chat.responsible_uuid.toString();
                else if (author_uuid === chat.responsible_uuid)
                    to = chat.owner_uuid.toString();

                req.notificationIo?.to(to).emit("notification");
            }

            // TODO: create api Alert to notifiy message

            return res.json(message);
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            });
        }
    },
    async file(req: IRequest, res: Response): Promise<Response> {
        console.log(req.file);

        return res.send(200);
    },
};
