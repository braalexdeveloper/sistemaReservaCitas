import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import bcrypt from 'bcryptjs';


class Usuario extends Model {
    public id!: number;
    public nombre!: string;
    public rol!: string;
    public email!: string;
    public contrasena!: string;

    //Metodo para verificar la contraseña
    public validPassword(password:string):boolean{
    return bcrypt.compareSync(password,this.contrasena);
    }
}

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName:'Usuario',
        tableName: 'usuarios',
        timestamps:false
    }
);

//Antes de guardar el usuario, se encripta la contraseña
Usuario.beforeCreate(async(user:any)=>{
const salt=await bcrypt.genSalt(10);
user.contrasena=await bcrypt.hash(user.contrasena,salt);
});

export default Usuario;
