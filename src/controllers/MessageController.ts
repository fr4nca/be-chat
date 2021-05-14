import axios from "axios";
import { Response } from "express";

import { apiUrl, uploadsUrl } from "../config/config.json";
import Chat from "../models/Chat";
import Message from "../models/Message";
import Notification from "../models/Notification";
import { IRequest } from "../types/types";

export default {
  async store(req: IRequest, res: Response): Promise<Response> {
    const {
      text,
      author_uuid,
      author_name,
      author_email,
      is_staff,
      chat_id,
    } = req.body;

    const { file } = req;

    const filePath = file ? `${uploadsUrl}${file?.filename}` : undefined;

    try {
      const message = await Message.create({
        text,
        author_uuid,
        author_name,
        author_email,
        chat_id,
        file: filePath,
      });

      const chat = await Chat.findByPk(chat_id);

      if (!chat) {
        return res.status(400).json({
          message: "Chat not found",
        });
      }

      if (!chat.responsible_uuid && is_staff === "true") {
        chat.responsible_uuid = author_uuid;

        chat.save();
      }

      req.chatIo?.to(chat_id).emit("message", {
        message,
      });

      let user;

      if (author_uuid === chat?.responsible_uuid) {
        user = chat.owner_uuid;
      }
      if (author_uuid === chat?.owner_uuid) {
        user = chat.responsible_uuid;
      }

      if (user) {
        const [not, created] = await Notification.findOrCreate({
          where: {
            chat_id: chat.id.toString(),
            user_uuid: user.toString(),
          },
          defaults: {
            chat_id: chat.id.toString(),
            user_uuid: user.toString(),
            type: "new_message",
            description: "Nova mensagem recebida",
            status: 0,
          },
        });

        if (created || not.status === 1) {
          not.status = 0;
          not.save();

          req.notificationIo?.to(user.toString()).emit("new message", {
            chat_id: not.chat_id,
            description: not.description,
            id: not.id,
            status: not.status,
            type: not.type,
            user_uuid: not.user_uuid,
            team: chat.team,
          });
        }
      }

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
