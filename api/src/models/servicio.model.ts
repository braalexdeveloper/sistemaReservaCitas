import {  DataTypes,Model } from 'sequelize';
import sequelize from "../config/db.config";


class Servicio extends Model{
    public id!: number;
    public nombre!: string;
    public descripcion!: string;
}

Servicio.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'servicios',
        modelName:'Servicio',
        timestamps:false
    }
);



export default Servicio;