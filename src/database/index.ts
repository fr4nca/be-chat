import { Dialect, Sequelize } from "sequelize";

import config from "../config/database.json";

const sequelize = new Sequelize(
    config.database,
    config.username,

    config.password,
    {
        dialect: config.dialect as Dialect,
        host: config.host,
        port: config.port,
        define: config.define,
    }
);

export default sequelize;
