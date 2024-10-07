import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import Usuario from "../models/usuario.model";
import { JWT_SECRET } from "../config/config";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, contrasena } = req.body;
        
        const userFound = await Usuario.findOne({ where: { email } });
       
        if (!userFound) {
            res.status(404).json({ msg: "Usuario no encontrado" });
           return;
        }

        const validatePassword = userFound?.validPassword(contrasena);

        if (!validatePassword) {
           res.status(401).json({ msg: "Contraseña Incorrecta" });
            return;
        }

        //Generamos token
        const token = jwt.sign({ id: userFound?.id, email: userFound?.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            user: userFound,
            token
        });
    } catch (error) {
       res.status(500).json({ error: "Erro al loguearse : " + error });
    }
}