import { Request, Response } from "express";
import Cita from "../models/cita.model";
import Paciente from "../models/paciente.model";
import Servicio from "../models/servicio.model";


export const getCitas = async (req: Request, res: Response) => {
    try {
        const citas = await Cita.findAll({
            include: [
                {
                    model: Paciente,   // Incluye el modelo Paciente
                    attributes: ['nombre', 'dni','telefono'] // Solo trae campos específicos, opcional
                },
                {
                    model: Servicio// Solo trae campos específicos, opcional
                }
            ]
        });

           // Convertir fechaCita al formato deseado
           const citasFormateadas = citas.map(cita => {
            const fecha = new Date(cita.fechaCita);
            const dia = String(fecha.getDate()).padStart(2, '0');
            const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
            const anio = fecha.getFullYear();

            return {
                ...cita.toJSON(), // Convierte la instancia de Sequelize a JSON
                fechaCita: `${dia}/${mes}/${anio}` // Formato DD/MM/YYYY
            };
        });
        
        res.status(200).json({citas:citasFormateadas});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener citas' });
    }
}

export const createCita = async (req: Request, res: Response) => {
    try {
        const { usuarioId,pacienteId,servicioId,fechaCita,horaCita,estado } = req.body;
         // Convertimos la fecha de DD/MM/YYYY a un objeto Date
         const [day, month, year] = fechaCita.split('/');
         const fechaCitaDate = new Date(`${year}-${month}-${day}`);

        const cita = await Cita.create({ usuarioId,pacienteId,servicioId,fechaCita:fechaCitaDate,horaCita,estado });
        res.status(201).json({msg:"Cita creada correctamente",cita});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al crear cita' });
    }
}



export const updateCita = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { usuarioId,pacienteId,servicioId,fechaCita,horaCita,estado } = req.body;
       
         // Convertimos la fecha de DD/MM/YYYY a un objeto Date
         const [day, month, year] = fechaCita.split('/');
         const fechaCitaDate = new Date(`${year}-${month}-${day}`);
    
         // Actualizar el paciente
         const [affectedRows] = await Cita.update(
            { usuarioId,pacienteId,servicioId,fechaCita:fechaCitaDate,horaCita,estado },
            { where: { id } }
        );

        // Si no se encuentra la cita, devolver 404
        if (affectedRows === 0) {
            res.status(404).json({ msg: "Cita no encontrado" });
            
        }

        // Obtener la cita actualizado
        const updatedCita = await Cita.findByPk(id);

        // Devolver la cita actualizado
        res.json({
            msg: "Cita actualizado correctamente",
            cita: updatedCita // Devolvemos la cita actualizada
        });
        
    } catch (error) {

        res.status(500).json({ message: 'Error al actualizar cita' });
    }
}

export const deleteCita = async (req: Request, res: Response)=>{
    try {
        const { id } = req.params;
        // Buscar el cita por su ID
        const cita = await Cita.findByPk(id);

        // Si no se encuentra el cita, devolver 404
        if (!cita) {
            res.status(404).json({ msg: "Cita no encontrado" });
            return;
        }

        // Eliminar el cita
        await cita.destroy();

        // Devolver un mensaje de éxito
        res.json({ msg: "Cita eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar cita' });

    }
}