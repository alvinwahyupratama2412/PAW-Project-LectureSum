require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./config/appConfig');
const logger = require('./middlewares/logger');
const apiRoutes = require('./routes/apiRoutes');
const viewRoutes = require('./routes/viewRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

app.use('/api', apiRoutes);
app.use('/', viewRoutes);

const PORT = process.env.PORT || 5173;

sequelize.sync({ alter: true }) 
    .then(() => {
        console.log('Database PostgreSQL terhubung.');
        app.listen(PORT, () => console.log(`Server aktif di http://localhost:${PORT}`));
    })
    .catch(err => console.error('Koneksi gagal:', err));