import {  DataTypes,Model } from 'sequelize';

import sequelize from '../config/db.config';


class Paciente extends Model{
    public id!:number;
    public dni!:string;
    public nombre!:string;
    public telefono!:string;
    public email!:string;
}

Paciente.init(
    {
        id:{
            type:DataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true
        },
        dni:{
          type:DataTypes.STRING,
          unique:true
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        telefono:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        }
    },
    {
        sequelize,
        modelName:'Paciente',
        tableName:'pacientes',
        timestamps:true
    }
);



export default Paciente;