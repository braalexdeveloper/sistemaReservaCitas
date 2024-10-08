import { Router } from "express";
import { getPacientes,createPaciente,updatePaciente,deletePaciente } from "../controllers/pacientes.controller";
import { verifyToken } from "../middleware/authjwt";
import { pacienteValidationRule, validateFields } from "../middleware/validationsMiddleware";

const router=Router();

/*router.get('/',verifyToken,getPacientes);
router.post('/',verifyToken,pacienteValidationRule, validateFields,createPaciente);
router.put('/:id',verifyToken,pacienteValidationRule, validateFields,updatePaciente);
router.delete('/:id',verifyToken,deletePaciente);*/

router.get('/',getPacientes);
router.post('/',pacienteValidationRule, validateFields,createPaciente);
router.put('/:id',pacienteValidationRule, validateFields,updatePaciente);
router.delete('/:id',deletePaciente);

export default router;