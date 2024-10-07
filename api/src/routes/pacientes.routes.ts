import { Router } from "express";
import { getPacientes,createPaciente,updatePaciente,deletePaciente } from "../controllers/pacientes.controller";
import { verifyToken } from "../middleware/authjwt";
import { userValidationRule, validateFields } from "../middleware/validationsMiddleware";

const router=Router();

router.get('/',verifyToken,getPacientes);
router.post('/',verifyToken,userValidationRule, validateFields,createPaciente);
router.put('/:id',verifyToken,userValidationRule, validateFields,updatePaciente);
router.delete('/:id',verifyToken,deletePaciente);

export default router;