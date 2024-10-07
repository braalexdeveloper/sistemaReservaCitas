import { Router } from "express";
import { createCita, deleteCita, getCitas, updateCita } from "../controllers/citas.controller";
import { verifyToken } from "../middleware/authjwt";

const router=Router();

router.get('/',verifyToken,getCitas);
router.post('/',verifyToken,createCita);
router.put('/:id',verifyToken,updateCita);
router.delete('/:id',verifyToken,deleteCita);


export default router;