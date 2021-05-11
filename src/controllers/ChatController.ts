import axios from "axios";
import { Response } from "express";

import { apiUrl } from "../config/config.json";
import Chat from "../models/Chat";
import Message from "../models/Message";
import { IRequest } from "../types/types";

export default {
    async store(req: IRequest, res: Response): Promise<Response> {
        const {
            summary,
            owner_uuid,
            owner_email,
            owner_name,
            company_uuid,
            team,
            resource_id,
            resource_type,
        } = req.body;

        try {
            const chat = await Chat.create({
                summary,
                owner_uuid,
                owner_email,
                owner_name,
                company_uuid,
                team,
                resource_id,
                resource_type,
            });

            const room = "staff";

            req.staffIo?.to(room).emit("new chat", chat);

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
    async destroy(req: IRequest, res: Response): Promise<Response> {
        try {
            const { chat_uuid } = req.params;

            const chat = await Chat.findOne({
                where: {
                    id: chat_uuid,
                },
            });

            if (!chat) {
                return res.status(404).json({
                    message: "Chat not found",
                });
            }

            chat.open = false;

            chat.save();

            return res.json(chat);
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            });
        }
    },
    async scale(req: IRequest, res: Response): Promise<Response> {
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

            let text = "";

            chat?.messages.forEach((message) => {
                text += `\n*${
                    message.author_name
                }* (${message.createdAt.toLocaleString()}): ${message.text}`;
            });

            if (!chat) {
                return res.status(404).json({
                    message: "Chat not found",
                });
            }

            const payload = {
                owner: chat.owner_uuid,
                summary: chat.summary,
                team: chat.team,
                target_id: chat.resource_id,
                target_type: chat.resource_type,
                is_lv1_support: true,
                text,
            };

            const { data } = await axios.post(`${apiUrl}/v3/ticket/`, payload, {
                headers: {
                    Authorization: `jwt ${req.headers.authorization}`,
                },
            });

            return res.json(data);
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            });
        }
    },
};
