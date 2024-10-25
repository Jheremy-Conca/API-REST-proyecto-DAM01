import { pool } from '../db.js'

export const getFavs= async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM tb_favoritos")
    res.json(rows);
};

export const getFav = async (req, res) => {
    const { nomUsuario } = req.params;
    const { rows } = await pool.query("SELECT * FROM tb_favoritos WHERE nomUsuario = $1", [nomUsuario]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" })
    }

    res.json(rows);
};

export const createFav = async (req, res) => {
    const data = req.body;

    // Validar que los campos estén presentes
    if (!data.iddinosaurio || !data.nomusuario) {
        return res.status(400).json({ message: "idDinosaurio and nomUsuario are required" });
    }

    try {
        // Verificar si el favorito ya existe
        const existingFav = await pool.query(
            "SELECT * FROM tb_favoritos WHERE idDinosaurio = $1 AND nomUsuario = $2",
            [data.iddinosaurio, data.nomusuario]
        );

        if (existingFav.rows.length > 0) {
            return res.status(409).json({ message: "Favorite already exists" });
        }

        // Si no existe, procede a la inserción
        const { rows } = await pool.query(
            "INSERT INTO tb_favoritos (idDinosaurio, nomUsuario) VALUES ($1, $2) RETURNING *",
            [data.iddinosaurio, data.nomusuario]
        );
        return res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};




export const deleteFav = async (req, res) => {
    const { nomUsuario, iddinosaurio } = req.params; // Asegúrate de que iddinosaurio se pase en la URL

    try {
        // Primero, verifica si el favorito existe para el usuario
        const { rows: favorite } = await pool.query(
            "SELECT * FROM tb_favoritos WHERE nomUsuario = $1 AND idDinosaurio = $2",
            [nomUsuario, iddinosaurio]
        );

        // Si no existe, devolver un error 404
        if (favorite.length === 0) {
            return res.status(404).json({ message: "Favorite not found" });
        }

        // Si existe, proceder a eliminar el favorito
        await pool.query("DELETE FROM tb_favoritos WHERE nomUsuario = $1 AND idDinosaurio = $2", [nomUsuario, iddinosaurio]);

        // Luego, eliminar al usuario
        const { rowCount } = await pool.query("DELETE FROM users WHERE nomUsuario = $1 RETURNING *", [nomUsuario]);

        // Verificar si se eliminó al usuario
        if (rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        console.error(error); // Para registrar el error en consola
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const updateFav = async (req, res) => {
        const { nomUsuario } = req.params; // asumiendo que nomUsuario se pasa como parámetro de la URL
        const data = req.body;

        // Validar que los campos estén presentes
        if (!data.iddinosaurio) {
            return res.status(400).json({ message: "idDinosaurio is required" });
        }

        try {
            // Actualizar el favorito
            const { rows } = await pool.query(
                "UPDATE tb_favoritos SET idDinosaurio = $1 WHERE nomUsuario = $2 RETURNING *",
                [data.iddinosaurio, nomUsuario] // usamos nomUsuario desde params
            );

            // Verificar si se actualizó algún registro
            if (rows.length === 0) {
                return res.status(404).json({ message: "Favorite not found" });
            }

            return res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
