import { Router } from "express";
import {createDino, deleteDino, getDino, getDinos, updateDino } from "../controllers/dino.controller.js";

const router = Router();

router.get('/dino', getDinos);

router.get('/dino/:nomdinosaurio', getDino);

router.post('/dino', createDino);

router.delete('/dino/:nomdinosaurio', deleteDino);

router.put('/dino/:nomdinosaurio', updateDino);

export default router;