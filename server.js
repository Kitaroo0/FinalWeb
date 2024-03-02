const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const requireAdmin = require('./middleware/requireAdmin');
require('dotenv').config();
const app = express();
const axios = require('axios');
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
});

const main = require('./routes/main');
const addProfRout = require('./routes/addProf');
const adminRoute = require('./routes/admin');
const registerRout = require('./routes/register');
const loginRout = require('./routes/login');
const universitiesRoute = require('./routes/universitiesRoute');
const vacanciesRouter = require('./routes/vacancies');
const nasaRoute = require('./routes/nasa');
app.use('/', main);
app.use('/register', registerRout);
app.use('/admin', requireAdmin, adminRoute);
app.use('/login', loginRout);
app.use('/addPortfolio', addProfRout);
app.use('/universities', universitiesRoute);
app.use('/vacancies', vacanciesRouter);
app.use('/nasa', nasaRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});