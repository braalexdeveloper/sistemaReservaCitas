import { Request, Response } from "express";
import Paciente from "../models/paciente.model";

export const getPacientes = async (req: Request, res: Response):Promise<any> => {
    try {
        const pacientes = await Paciente.findAll();
        return res.status(200).json(pacientes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al obtener pacientes' });
    }
}

export const createPaciente = async (req: Request, res: Response) => {
    try {
        const { nombre, telefono, email } = req.body;
        const paciente = await Paciente.create({ nombre, telefono, email });
        res.status(201).json(paciente);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al crear paciente' });
    }
}



export const updatePaciente = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, telefono, email } = req.body;
        // Actualizar el paciente
        const [affectedRows] = await Paciente.update(
            { nombre, telefono, email },
            { where: { id } }
        );

        // Si no se encuentra el paciente, devolver 404
        if (affectedRows === 0) {
            res.status(404).json({ msg: "Paciente no encontrado" });
            return;
        }

        // Obtener el paciente actualizado
        const updatedPaciente = await Paciente.findByPk(id);

        // Devolver el paciente actualizado
        res.json({
            msg: "Paciente actualizado correctamente",
            paciente: updatedPaciente // Devolvemos el paciente actualizado
        });
        return;
    } catch (error) {

        res.status(500).json({ message: 'Error al actualizar paciente' });
    }
}

export const deletePaciente = async (req: Request, res: Response):Promise<void> =>{
    try {
        const { id } = req.params;
        // Buscar el paciente por su ID
        const paciente = await Paciente.findByPk(id);

        // Si no se encuentra el paciente, devolver 404
        if (!paciente) {
            res.status(404).json({ msg: "Paciente no encontrado" });
            return;
        }

        // Eliminar el paciente
        await paciente.destroy();

        // Devolver un mensaje de éxito
        res.json({ msg: "Paciente eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar paciente' });

    }
}