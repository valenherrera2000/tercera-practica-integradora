import { Router } from 'express';
import CartController from '../../controllers/cart.controller.js';

const router = Router();

router.get('/carts', async (req, res) => {
    const { query = {} } = req;
    const carts = await CartController.get(query);
    res.status(200).json(carts);
});

router.get('/carts/:cartId', async (req, res) => {
    try {
        const { params: { cartId } } = req;
        const cart = await CartController.getById(cartId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

router.post('/carts', async (req, res) => {
    const { body } = req;
    const newCart = { ...body };
    const cart = await CartController.create(newCart);
    res.status(201).json(cart);
});

router.put('/carts/:cartId', async (req, res) => {
    try {
        const { params: { cartId }, body } = req;
        await CartController.updateById(cartId, body);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

router.delete('/carts/:cartId', async (req, res) => {
    try {
        const { params: { cartId } } = req;
        await CartController.deleteById(cartId);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

export default router;
