const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const config = require('./config');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cards = require('./app/cards');
const users = require('./app/users');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const certificatePath = process.env.PATH_CERTIFICATE;
const keyCertificate = process.env.PATH_CERTIFICATE_KEY;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.urlencoded({ extended: false }));

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/cards', cards);
    app.use('/users', users);

    if (process.env.NODE_ENV === 'development') {
        app.listen(port, () => {
            console.log(`Server started on ${port} port`);
        });
    } else {
        https.createServer({
            key: fs.readFileSync(keyCertificate),  // Укажите путь к вашему ключу
            cert: fs.readFileSync(certificatePath) // Укажите путь к вашему сертификату
        }, app).listen(port, () => {
            console.log(`Server started on ${port} port`);
        });
    }
});


// const express = require('express');
// const config = require('./config');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const path = require('path');
// const cards = require('./app/cards');
// const users = require('./app/users');
// require('dotenv').config();
//
// const app = express();
//
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));
//
// app.use(express.urlencoded({ extended: false }));
//
// // Добавляем роуты из модуля auth
// const port = process.env.PORT;
//
// mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
//     app.use('/cards', cards);
//     app.use('/users', users);
//
//     app.listen(port, () => {
//         console.log(`Server started on ${port} port`);
//     });
// });
