import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../database";
import Message from "./Message";

interface IChatAttributes {
    id: number;
    open: boolean;
    responsible_uuid: number;

    summary: string;
    owner_uuid: number;
    owner_email: string;
    company_uuid: number;
    team: number;
    resource_id: number;
    resource_type: string;
}

type ChatCreationAttributes = Optional<
    IChatAttributes,
    "id" | "responsible_uuid" | "open"
>;

class Chat
    extends Model<IChatAttributes, ChatCreationAttributes>
    implements IChatAttributes {
    public id!: number;
    public owner_uuid!: number;
    public owner_email!: string;
    public company_uuid!: number;
    public responsible_uuid!: number;
    public summary!: string;
    public resource_type!: string;
    public resource_id!: number;
    public team!: number;
    public open!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Chat.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        owner_uuid: DataTypes.UUID,
        owner_email: DataTypes.STRING,
        company_uuid: DataTypes.UUID,
        responsible_uuid: DataTypes.UUID,
        summary: DataTypes.STRING,
        resource_type: DataTypes.STRING,
        resource_id: DataTypes.INTEGER,
        team: DataTypes.INTEGER,
        open: DataTypes.BOOLEAN,
    },
    {
        sequelize,
    }
);

Chat.hasMany(Message, {
    foreignKey: "chat_id",
    as: "messages",
});

export default Chat;
