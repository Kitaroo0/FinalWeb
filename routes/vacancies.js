// routes/vacancies.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const apiUrl = 'https://api.hh.ru/vacancies';
        const response = await axios.get(apiUrl);
        const vacancies = response.data;

        res.render('vacancies', { vacancies }); // Передаем данные о вакансиях в шаблон EJS
    } catch (error) {
        console.error('Error fetching vacancies:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;