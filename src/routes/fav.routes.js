import { Router } from "express";
import { createFav, deleteFav, getFav, getFavs, updateFav } from "../controllers/fav.controller.js";

const router = Router();

router.get('/fav', getFavs);

router.get('/fav/:nomUsuario', getFav);

router.post('/fav', createFav);

router.delete('/fav/:nomUsuario/:iddinosaurio', deleteFav);

router.put('/fav/:nomUsuario', updateFav);

export default router;