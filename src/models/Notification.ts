import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../database";
import Chat from "./Chat";

interface INotificationAttributes {
  id: string;
  chat_id: string;
  user_uuid: string;
  type: string;
  status: number;
  description: string;
}

type NotificationCreationAttributes = Optional<INotificationAttributes, "id">;

class Notification
  extends Model<INotificationAttributes, NotificationCreationAttributes>
  implements INotificationAttributes {
  public id!: string;
  public chat_id!: string;
  public user_uuid!: string;
  public type!: string;
  public status!: number;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_uuid: DataTypes.UUID,
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
  },
  {
    sequelize,
  },
);

export default Notification;
