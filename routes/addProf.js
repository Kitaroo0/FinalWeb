const express = require('express');
const router = express.Router();
const PortfolioItem = require('../models/portfolioItem');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { sendPortfolioCreationEmail } = require('../utils/mailer');
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('add_portfolio', { username: req.session.user });
});

router.post('/', upload.array('images', 3), async (req, res) => {
    try {
        const username = req.session.user;
        const user = await User.findOne({ username });
        const userEmail = user.email;
        
        const { name, description } = req.body;
        const images = req.files.map(file => file.path); // Получаем массив путей к изображениям

        // Создаем новый объект портфолио с данными из формы
        const newPortfolio = new PortfolioItem({ 
            name: name, 
            description: description, 
            images: images 
        });

        // Сохраняем портфолио в базу данных
        await newPortfolio.save();
        await sendPortfolioCreationEmail(userEmail);
        res.redirect('/'); // Перенаправляем на главную страницу
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;