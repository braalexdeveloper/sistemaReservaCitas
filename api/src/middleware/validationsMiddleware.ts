import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

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
        .notEmpty().withMessage('El dni del paciente es requerido'),
    body('telefono')
        .notEmpty().withMessage('El telefono es requerido'),
    body('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email debe ser válido')
    
];

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    next();
}