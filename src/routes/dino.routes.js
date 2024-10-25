import { Router } from "express";
import { createDino, deleteDino, getDino, getDinos, updateDino } from "../controllers/dino.controller.js";
import path from "path"; // Asegúrate de importar el módulo path

const router = Router();

// Ruta para obtener todos los dinosaurios
router.get('/dino', getDinos);

// Ruta para obtener un dinosaurio específico por nombre
router.get('/dino/:nomdinosaurio', getDino);

// Ruta para crear un nuevo dinosaurio
router.post('/dino', createDino);

// Ruta para eliminar un dinosaurio por nombre
router.delete('/dino/:nomdinosaurio', deleteDino);

// Ruta para actualizar un dinosaurio por nombre
router.put('/dino/:nomdinosaurio', updateDino);

// Ruta para servir la vista que muestra la lista de dinosaurios
router.get('/dinosaurios', (req, res) => {
    res.sendFile(path.resolve('views/dinos.html')); // Ajusta la ruta según tu estructura de carpetas
});

export default router;
