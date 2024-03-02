const express = require('express');
const router = express.Router();
const PortfolioItem = require('../models/portfolioItem');
const requireAuth = require('../middleware/authMid');
router.get('/', requireAuth, async (req, res) => {
    try {
        // Получение всех портфолио из базы данных
        const portfolios = await PortfolioItem.find();

        // Рендеринг главной страницы с передачей списка портфолио в шаблон
        res.render('main', { portfolios, username: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;