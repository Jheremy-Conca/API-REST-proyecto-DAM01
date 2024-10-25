import { Router } from "express";
import { getUsers,getUser, createUser, deleteUser, updateUser } from "../controllers/users.controller.js"; 

const router = Router();

router.get('/users', getUsers);

router.get('/users/:nomUsuario', getUser);

router.post('/users', createUser);

router.delete('/users/:nomUsuario', deleteUser);

router.put('/users/:nomUsuario', updateUser);


export default router;