import { pool } from '../db.js';

export const getDinos = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM tb_dinosaurios");
    res.json(rows);
};

export const getDino = async (req, res) => {
    const { nomdinosaurio } = req.params;
    const { rows } = await pool.query("SELECT * FROM tb_dinosaurios WHERE nomdinosaurio = $1", [nomdinosaurio]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "Dino not found" });  // Updated message for consistency
    }

    res.json(rows[0]);  // Return the first row, as it's the specific dino requested
};

export const createDino = async (req, res) => {
    const data = req.body;
    try {
        const { rows } = await pool.query(
            "INSERT INTO tb_dinosaurios (nomdinosaurio, nomcientifico, periodo, habitat, dieta, datoscuriosos, imagen, familia, tamaño, peso, descripcion, ubicacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
            [
                data.nomdinosaurio,
                data.nomcientifico,
                data.periodo,
                data.habitat,
                data.dieta,
                data.datoscuriosos,
                data.imagen,
                data.familia,
                data.tamaño,
                data.peso,
                data.descripcion,
                data.ubicacion
            ]
        );
        return res.status(201).json(rows[0]);  // Send back the created dino
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({ message: "Dino already exists" });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteDino = async (req, res) => {
    const { nomdinosaurio } = req.params;
    const { rowCount } = await pool.query("DELETE FROM tb_dinosaurios WHERE nomdinosaurio = $1", [nomdinosaurio]);

    if (rowCount === 0) {
        return res.status(404).json({ message: "Dino not found" });
    }
    return res.sendStatus(204);  // Successful deletion, no content
};

export const updateDino = async (req, res) => {
    const { nomdinosaurio } = req.params;
    const data = req.body;

    const { rows } = await pool.query(
        "UPDATE tb_dinosaurios SET nomdinosaurio = $1, nomcientifico = $2, periodo = $3, habitat = $4, dieta = $5, datoscuriosos = $6, imagen = $7, familia = $8, tamaño = $9, peso = $10, descripcion = $11, ubicacion = $12 WHERE nomdinosaurio = $13 RETURNING *",
        [
            data.nomdinosaurio,
            data.nomcientifico,
            data.periodo,
            data.habitat,
            data.dieta,
            data.datoscuriosos,
            data.imagen,
            data.familia,
            data.tamaño,
            data.peso,
            data.descripcion,
            data.ubicacion,
            nomdinosaurio  // This is used to match the record being updated
        ]
    );

    if (rows.length === 0) {
        return res.status(404).json({ message: "Dino not found" });  // Handle case where no dino is updated
    }
    
    return res.json(rows[0]);  // Return the updated dino
};
