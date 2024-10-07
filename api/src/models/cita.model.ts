import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";


class Cita extends Model {
    public id!: number;
    public pacienteId!: number;
    public servicioId!: number;
    public usuarioId!:number;
    public fechaCita!: Date;
    public horaCita!: string;
    public estado!: string;
}

Cita.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        pacienteId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        servicioId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        usuarioId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        fechaCita: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        horaCita: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            defaultValue: 'pendiente',
        }
    },
    {
        sequelize,
        modelName: 'Cita',
        tableName: 'citas',
        timestamps: true,
    }
);



export default Cita;