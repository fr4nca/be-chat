import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../database";
import Chat from "./Chat";

interface IMessageAttributes {
    id: number;
    chat_id: number;
    text: string;
    file: string;
    author_uuid: number;
    author_name: string;
    author_email: string;
}

type MessageCreationAttributes = Optional<IMessageAttributes, "id" | "file">;

class Message
    extends Model<IMessageAttributes, MessageCreationAttributes>
    implements IMessageAttributes {
    public id!: number;
    public chat_id!: number;
    public text!: string;
    public file!: string;
    public author_uuid!: number;
    public author_name!: string;
    public author_email!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
Message.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        chat_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Chat,
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        author_uuid: DataTypes.UUID,
        author_name: DataTypes.STRING,
        author_email: DataTypes.STRING,
        file: DataTypes.STRING,
        text: DataTypes.STRING,
    },
    {
        sequelize,
    }
);

export default Message;
