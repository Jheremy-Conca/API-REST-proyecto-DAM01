import { Router } from "express"; 
import { getUsers, getUser, createUser, deleteUser, updateUser } from "../controllers/users.controller.js";
import path from "path"; // Asegúrate de importar el módulo path

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/users', getUsers);

// Ruta para obtener un usuario específico por nombre de usuario
router.get('/users/:nomUsuario', getUser);

// Ruta para crear un nuevo usuario
router.post('/users', createUser);

// Ruta para eliminar un usuario por nombre de usuario
router.delete('/users/:nomUsuario', deleteUser);

// Ruta para actualizar un usuario por nombre de usuario
router.put('/users/:nomUsuario', updateUser);

// Ruta para servir la vista que muestra la lista de usuarios
router.get('/usuarios', (req, res) => {
    res.sendFile(path.resolve('views/users.html')); // Ajusta la ruta según tu estructura de carpetas
});

export default router;
