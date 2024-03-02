// universitiesRoute.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const country = req.query.country; // Получаем название страны из параметра запроса

        // Выполняем запрос к API для получения списка университетов по названию страны
        const apiUrl = `http://universities.hipolabs.com/search?country=${country}`;
        const response = await axios.get(apiUrl);
        const universities = response.data;

        // Рендерим шаблон universities.ejs и передаем данные об университетах и названии страны
        res.render('universities', { universities, country });
    } catch (error) {
        console.error('Error fetching university data:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
