import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import Usuario from './models/usuario.model'; // Importar modelo Usuario
import sequelize from './config/db.config';
import Paciente from './models/paciente.model'; // Importar modelo Paciente
import Servicio from './models/servicio.model'; // Importar modelo Servicio
import Cita from './models/cita.model'; // Importar modelo Cita

import authRoutes from './routes/auth.routes';
import pacientesRoutes from './routes/pacientes.routes';
import servicioRoutes from './routes/servicio.routes';
import usuariosRoutes from './routes/usuario.routes';
import citasRoutes from './routes/cita.routes';


dotenv.config();

const app=express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/servicios',servicioRoutes);
app.use('/api/usuarios',usuariosRoutes);
app.use('/api/citas',citasRoutes);

// Luego define las asociaciones aquí, si lo deseas
Usuario.hasMany(Cita, { foreignKey: 'usuarioId' });
Cita.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Paciente.hasMany(Cita, { foreignKey: 'pacienteId' });
Cita.belongsTo(Paciente, { foreignKey: 'pacienteId' });

Servicio.hasMany(Cita, { foreignKey: 'servicioId' });
Cita.belongsTo(Servicio, { foreignKey: 'servicioId' });

const startServer=async()=>{
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');
        // Sincroniza todos los modelos
        await sequelize.sync({ force:false }); // Aquí se crearán todas las tablas

        //Crear usuario admin
        await Usuario.findOrCreate({
            where:{email:"brayan@gmail.com"},
            defaults:{
                nombre:"brayan alexander",
                rol:"admin",
                email:"brayan@gmail.com",
                contrasena:"brayan123"
            }
        })

        app.listen(PORT,()=>{
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}

startServer();
