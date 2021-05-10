import { Response } from "express";

import { debug, uploadsUrl } from "../config/config.json";
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
        const filePath = debug
            ? file?.filename
            : `${uploadsUrl}${file?.filename}`;

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

            // TODO: create api Alert to notifiy message

            return res.json(message);
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            });
        }
    },
    async file(req: IRequest, res: Response): Promise<Response> {
        return res.send(200);
    },
};
