const express = require('express');
const router = express.Router();
const PortfolioItem = require('../models/portfolioItem');

// Страница администратора
router.get('/', async (req, res) => {
    try {
        // Получение всех элементов портфолио из базы данных
        const portfolioItems = await PortfolioItem.find();
        res.render('admin', { username: req.session.user, portfolioItems });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Удаление элемента портфолио
router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        await PortfolioItem.findByIdAndDelete(id);
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Редактирование элемента портфолио
router.post('/edit', async (req, res) => {
    try {
        const { id, name, description } = req.body;
        await PortfolioItem.findByIdAndUpdate(id, { name, description });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;