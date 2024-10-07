import { Request, Response } from "express";
import Servicio from "../models/servicio.model";

export const getServicios = async (req: Request, res: Response): Promise<void> => {
    try {
        const servicios = await Servicio.findAll();
        res.status(200).json({
            servicios
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const createServicio = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, descripcion } = req.body;
        const servicio = await Servicio.create({ nombre, descripcion });
        res.status(200).json({
            msg: "Servicio creado correctamente",
            servicio
        });
    } catch (error) {
        res.status(500).json({ error: "Error al crear servicio : " + error });
    }
}

export const updateServicio = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, descripcion } = req.body;
        let servicioFound = await Servicio.findByPk(req.params.id);

        if (!servicioFound) {
            res.status(404).json({ msg: "Servicio no encontrado" });
            return;
        }
        servicioFound.nombre = nombre;
        servicioFound.descripcion = descripcion;

        const updatedServicio = await servicioFound.save();

        res.status(200).json({
            msg: "Serivicio actualizado correctamente",
            servicio: updatedServicio
        });
    } catch (error) {
        res.status(500).json({ "error": "Error al crear servicio : " + error });
    }
}

export const deleteServicio = async (req: Request, res: Response): Promise<void> => {
    try {
        const servicio = await Servicio.findByPk(req.params.id);
        if (!servicio) {
            res.status(404).json({ msg: "No existe el servicio" });
            return;
        }

        await servicio.destroy();

        res.status(200).json({
            msg: "Servicio eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}