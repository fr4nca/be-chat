import { Request } from "express";
import { Namespace } from "socket.io";

export interface IRequest extends Request {
    chatIo?: Namespace;
    notificationIo?: Namespace;
}

export interface IIoServers {
    chatIo?: Namespace;
    notificationIo?: Namespace;
}
