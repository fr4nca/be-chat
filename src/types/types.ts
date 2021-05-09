import { Request } from "express";
import { Namespace } from "socket.io";

export interface IRequest extends Request {
    chatIo?: Namespace;
}

export interface IIoNamespaces {
    chatIo?: Namespace;
}
