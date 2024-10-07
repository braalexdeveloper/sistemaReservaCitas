import { Router } from "express";
import { createUsuario, deleteUsuario, getUsuarios, updateUsuario } from "../controllers/usuarios.controller";
import { verifyToken } from "../middleware/authjwt";
import { userValidationRule, validateFields } from "../middleware/validationsMiddleware";

const router=Router();

router.get('/',verifyToken,getUsuarios);
router.post('/',verifyToken,userValidationRule,validateFields,createUsuario);
router.put('/:id',verifyToken,userValidationRule,validateFields,updateUsuario);
router.delete('/:id',verifyToken,deleteUsuario);

export default router;