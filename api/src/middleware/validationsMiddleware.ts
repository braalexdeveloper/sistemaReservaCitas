import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import Paciente from "../models/paciente.model";

export const userValidationRule = [
    body('nombre')
        .notEmpty().withMessage('El nombre de usuario es requerido')
        .isLength({ max: 30 }).withMessage('El nombre de usuario debe tener al menos 30 caracteres'),
    body('rol')
        .notEmpty().withMessage('El rol es requerido'),
    body('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email debe ser válido'),
    body('contrasena')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener minimo 8 caracteres')
];

export const pacienteValidationRule = [
    body('nombre')
        .notEmpty().withMessage('El nombre de paciente es requerido')
        .isLength({ max: 30 }).withMessage('El nombre de paciente debe tener al menos 30 caracteres'),
    body('dni')
        .notEmpty().withMessage('El dni del paciente es requerido')
        .custom(async (value) => {
            // Busca en la base de datos si el DNI ya existe
            const paciente = await Paciente.findOne({ where: { dni: value } });
            if (paciente) {
                return Promise.reject('El DNI ya está registrado');
            }
        }),
    body('telefono')
        .notEmpty().withMessage('El telefono es requerido'),
    body('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email debe ser válido')
        .custom(async (value) => {
            // Busca en la base de datos si el email ya existe
            const paciente = await Paciente.findOne({ where: { email: value } });
            if (paciente) {
                return Promise.reject('El email ya está registrado');
            }
        })
    
];

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    next();
}