import { Response } from "express";

import Chat from "../models/Chat";
import Message from "../models/Message";
import { IRequest } from "../types/types";

export default {
    async store(req: IRequest, res: Response): Promise<Response> {
        const {
            summary,
            owner_uuid,
            company_uuid,
            team,
            resource_id,
            resource_type,
        } = req.body;

        try {
            const chat = await Chat.create({
                summary,
                owner_uuid,
                company_uuid,
                team,
                resource_id,
                resource_type,
            });

            // TODO: create api Alert to notifiy chat

            return res.json(chat);
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            });
        }
    },
    async list(req: IRequest, res: Response): Promise<Response> {
        try {
            const chats = await Chat.findAll({
                where: req.query,
            });

            return res.json(chats);
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            });
        }
    },
    async retrieve(req: IRequest, res: Response): Promise<Response> {
        try {
            const { chat_uuid } = req.params;

            const chat = await Chat.findOne({
                where: {
                    id: chat_uuid,
                },
                include: [
                    {
                        model: Message,
                        as: "messages",
                    },
                ],
            });

            if (!chat) {
                return res.status(404).json({
                    message: "Chat not found",
                });
            }

            return res.json(chat);
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            });
        }
    },
};
