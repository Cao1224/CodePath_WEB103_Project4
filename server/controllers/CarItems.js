import { pool } from "../config/database.js";

const getAllCarItems = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM custom_items');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching car items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCarItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM custom_items WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Car item not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(`Error fetching car item with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createCarItem = async (req, res) => {
    const { interior, exterior, roof, wheels } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO custom_items (interior, exterior, roof, wheels) VALUES ($1, $2, $3, $4) RETURNING *',
            [interior, exterior, roof, wheels]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating car item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCarItem = async (req, res) => {
    const { id } = req.params;
    const { interior, exterior, roof, wheels } = req.body;
    try {
        const result = await pool.query(
            'UPDATE custom_items SET interior = $1, exterior = $2, roof = $3, wheels = $4 WHERE id = $5 RETURNING *',
            [interior, exterior, roof, wheels, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Car item not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(`Error updating car item with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteCarItem = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM custom_items WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Car item not found' });
        }
        res.json({ message: 'Car item deleted successfully' });
    } catch (error) {
        console.error(`Error deleting car item with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { getAllCarItems, getCarItemById, createCarItem, updateCarItem, deleteCarItem }; 