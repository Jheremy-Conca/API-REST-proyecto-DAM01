import pg from 'pg';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
  DB_PORT,
} from './config.js';

// Configuración de conexión con la base de datos
export const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});

// Prueba de conexión
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Database connected successfully', res.rows);
    initDB(); // Llamamos a la función de inicialización de la base de datos
  }
});

// Función para inicializar las tablas en la base de datos
const initDB = async () => {
  try {
    // Crea la tabla de usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        nomUsuario VARCHAR(30) PRIMARY KEY,
        correo VARCHAR(30),
        password VARCHAR(50),
        nombre VARCHAR(50),
        sexo VARCHAR(10),
        descripcion TEXT,
        imagen VARCHAR(1000)
      );
    `);

    // Inserta datos de prueba en la tabla users
    await pool.query(`
      INSERT INTO users (nomUsuario, correo, password, nombre, sexo, descripcion, imagen)
      VALUES 
      ('usuario123', 'usuario123@example.com', 'contraseñaSegura', 'Juan Pérez', 'Masculino', 'Descripción del usuario', 'ruta/a/imagen.jpg'),
      ('usuario456', 'usuario456@example.com', 'otraContraseñaSegura', 'María López', 'Femenino', 'Descripción de otro usuario', 'ruta/a/otra_imagen.jpg')
      ON CONFLICT DO NOTHING;  -- Evita duplicados si ya existen los registros
    `);

    // Crea la tabla de dinosaurios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tb_dinosaurios (
        idDinosaurio SERIAL PRIMARY KEY,
        nomDinosaurio VARCHAR(50) UNIQUE,
        nomCientifico VARCHAR(50),
        periodo VARCHAR(50),
        habitat VARCHAR(50),
        dieta VARCHAR(50),
        datosCuriosos VARCHAR(1000),
        imagen VARCHAR(1000),
        familia VARCHAR(50),
        tamaño VARCHAR(50),
        peso VARCHAR(50),
        descripcion VARCHAR(1000),
        ubicacion VARCHAR(1000)
      );
    `);

    // Inserta datos de prueba en la tabla tb_dinosaurios
    await pool.query(`
      INSERT INTO tb_dinosaurios 
      (nomDinosaurio, nomCientifico, periodo, habitat, dieta, datosCuriosos, imagen, familia, tamaño, peso, descripcion, ubicacion) 
      VALUES
      ('Tyrannosaurus Rex', 'Tyrannosaurus rex', 'Cretácico', 'Bosques y llanuras', 'Carnívoro', 'El Tyrannosaurus rex tenía una mordida más fuerte que cualquier otro animal terrestre.', '1', 'Tyrannosauridae', '12 metros', '8 toneladas', 'El Tyrannosaurus Rex es uno de los dinosaurios más grandes y feroces conocidos.', 'Norteamérica'),
      ('Triceratops', 'Triceratops horridus', 'Cretácico', 'Llanuras', 'Herbívoro', 'El Triceratops tenía tres cuernos en la cabeza y un gran escudo óseo.', '2', 'Ceratopsidae', '9 metros', '6 toneladas', 'El Triceratops es uno de los dinosaurios más conocidos por su distintiva cabeza con cuernos.', 'Norteamérica')
      ON CONFLICT DO NOTHING;
    `);

    // Crea la tabla de favoritos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tb_favoritos ( 
        id SERIAL PRIMARY KEY, 
        idDinosaurio INTEGER, 
        nomUsuario VARCHAR(30), 
        FOREIGN KEY (idDinosaurio) REFERENCES tb_dinosaurios(idDinosaurio), 
        FOREIGN KEY (nomUsuario) REFERENCES users(nomUsuario)
      );
    `);

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error initializing database tables:', error);
  }
};

// Exporta el pool para utilizarlo en otras partes de la aplicación
export default pool;
