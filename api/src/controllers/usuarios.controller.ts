import { Request, Response } from "express";
import Usuario from "../models/usuario.model";
import { IUsuario } from "../interfaces/usuario.interface";

export const getUsuarios = async (req: Request, res: Response):Promise<any>=>{
    try {
        const usuarios:IUsuario[] = await Usuario.findAll();
        return res.status(200).json({
            usuarios
        });
        
    } catch (error) {
        return res.status(500).json({ error });
        
    }
}

export const createUsuario = async (req: Request, res: Response):Promise<any> => {
    try {
        const { nombre, rol,email,contrasena }:IUsuario = req.body;
        const usuario = await Usuario.create({ nombre, rol,email,contrasena });
       return  res.status(200).json({
            msg: "Usuario creado correctamente",
            usuario
        });
    } catch (error) {
        return res.status(500).json({ error: "Error al crear usuario : " + error });
    }
}

export const updateUsuario = async (req: Request, res: Response):Promise<any> => {
    try {
        const { nombre, rol,email,contrasena }:IUsuario = req.body;
        const usuarioFound = await Usuario.findByPk(req.params.id);

        if (!usuarioFound) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
            
        }
        usuarioFound.nombre = nombre;
        usuarioFound.rol = rol;
        usuarioFound.email=email;
        usuarioFound.contrasena=contrasena;

        const updatedUsuario = await usuarioFound.save();

        return res.status(200).json({
            msg: "Usuario actualizado correctamente",
            usuario: updatedUsuario
        });
    } catch (error) {
        return res.status(500).json({ "error": "Error al crear usuario : " + error });
    }
}

export const deleteUsuario= async (req: Request, res: Response):Promise<any> => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ msg: "No existe el usuario" });
            
        }

        await usuario.destroy();

        return res.status(200).json({
            msg: "Usuario eliminado correctamente"
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}