import { pool } from '../db.js'

export const getUsers = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM users")
    res.json(rows);
};


export const getUser = async (req, res) => {
    const { nomUsuario } = req.params;
    const { rows } = await pool.query("SELECT * FROM users WHERE nomUsuario = $1", [nomUsuario]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" })
    }

    res.json(rows);
};

export const createUser = async(req, res) => {
    const data  = req.body;
    try{
        const { rows } = await pool.query(
            "INSERT INTO users (nomUsuario, correo, password, nombre, sexo, descripcion, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [data.nomUsuario, data.correo, data.password, data.nombre, data.sexo, data.descripcion, data.imagen])
            return res.json(rows[0])
    }catch(error){
        if (error?.code === "23505"){
            return res.status(409).json({ message: "User already exists"})
        }

        return res.status(500).json({message: 'Internal server error'})
    }
};

export const deleteUser = async (req, res) => {
    const { nomUsuario } = req.params
    const { rowCount } = await pool.query("DELETE FROM users WHERE nomUsuario = $1 RETURNING *", [nomUsuario]);
    console.log(rows);

    if (rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.sendStatus(204)
};

export const updateUser = async (req, res) => {
    const { nomUsuario } = req.params;
    const data = req.body;

    const { rows } = await pool.query(
        "UPDATE users SET nomUsuario = $1, correo = $2, password = $3, nombre = $4, descripcion = $5, imagen = $6 WHERE nomUsuario = $7 RETURNING *",
        [data.nomUsuario, data.correo, data.password, data.nombre, data.descripcion, data.imagen, nomUsuario]
    );

    return res.json(rows[0]);
};
