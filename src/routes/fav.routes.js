import { Router } from "express"; 
import { createFav, deleteFav, getFav, getFavs, updateFav } from "../controllers/fav.controller.js";
import path from "path"; // Asegúrate de importar el módulo path

const router = Router();

// Ruta para obtener todos los favoritos
router.get('/fav', getFavs);

// Ruta para obtener un favorito específico por nombre de usuario
router.get('/fav/:nomUsuario', getFav);

// Ruta para crear un nuevo favorito
router.post('/fav', createFav);

// Ruta para eliminar un favorito por nombre de usuario e id de dinosaurio
router.delete('/fav/:nomUsuario/:iddinosaurio', deleteFav);

// Ruta para actualizar un favorito por nombre de usuario
router.put('/fav/:nomUsuario', updateFav);

// Ruta para servir la vista que muestra la lista de favoritos
router.get('/favoritos', (req, res) => {
    res.sendFile(path.resolve('views/favs.html')); // Ajusta la ruta según tu estructura de carpetas
});

export default router;
