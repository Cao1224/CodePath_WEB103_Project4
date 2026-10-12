import express from 'express';
import { getAllCarItems, getCarItemById, createCarItem, updateCarItem, deleteCarItem } from '../controllers/CarItems.js';

const router = express.Router();

// Define routes for car items
router.get('/cars', getAllCarItems);
router.get('/cars/:id', getCarItemById);
router.post('/cars', createCarItem);
router.put('/cars/:id', updateCarItem);
router.delete('/cars/:id', deleteCarItem);

export default router;
