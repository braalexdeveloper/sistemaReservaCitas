import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(403).json({ msg: "No tienes acceso, Token no proporcionado" });
        return;
    }

    try {
        const decode = jwt.verify(token.split(' ')[1], JWT_SECRET);
        req.body.user = decode;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token inválido" });
        return;
    }

}
