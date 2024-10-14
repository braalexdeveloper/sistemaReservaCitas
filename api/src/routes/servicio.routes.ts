import { Router } from "express";
import { createServicio, deleteServicio, getServicios, updateServicio } from "../controllers/servicio.controller";
import { verifyToken } from "../middleware/authjwt";

const router=Router();

router.get('/',verifyToken,getServicios);
router.post('/',verifyToken,createServicio);
router.put('/:id',verifyToken,updateServicio);
router.delete('/:id',verifyToken,deleteServicio);


export default router;