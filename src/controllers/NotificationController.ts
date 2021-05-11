import { Response } from "express";

import Notification from "../models/Notification";
import { IRequest } from "../types/types";

export default {
    async list(req: IRequest, res: Response): Promise<Response> {
        try {
            const nots = await Notification.findAll({
                where: req.query,
            });

            return res.json(nots);
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            });
        }
    },
    async read(req: IRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const not = await Notification.findByPk(id);

            if (not?.status === 0) {
                not.status = 1;
                not.save();
            }

            return res.json(not);
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            });
        }
    },
};
