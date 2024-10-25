import express from 'express';
import dotenv from 'dotenv';
import { PORT } from './config.js';
import userRoutes from './routes/users.routes.js';
import dinoRoutes from './routes/dino.routes.js';
import favRoutes from './routes/fav.routes.js';
import morgan from 'morgan';

// Cargar variables de entorno
dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Definir las rutas
app.use('/users', userRoutes); // Asegúrate de definir las rutas correctamente
app.use('/dino', dinoRoutes);
app.use('/fav', favRoutes);

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('API is running'); // Mensaje simple para verificar que la API está en funcionamiento
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
