import { Sequelize } from "sequelize";

const sequelize=new Sequelize(process.env.DB_NAME || 'dbreservacitas',process.env.DB_USER || 'root', process.env.DB_PASS || '', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3306, // Especifica el puerto aquí
});

export default sequelize;