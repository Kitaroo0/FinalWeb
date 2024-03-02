// routes/nasa.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=WVanHsbSqnYwlDmO5zvcTX4rn7MEt8FVfXzSl1V5`;
        const response = await axios.get(apiUrl);
        const imageData = response.data;

        res.render('nasa', { imageData }); // Передаем данные об изображении в шаблон EJS
    } catch (error) {
        console.error('Error fetching NASA data:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
