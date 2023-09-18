const express = require('express');
const https = require('https');
const fs = require('fs');
const config = require('./config');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cards = require('./app/cards');
const users = require('./app/users');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/cards', cards);
    app.use('/users', users);

    https.createServer({
        key: fs.readFileSync('/var/www/httpd-cert/dordoi-optom.kg_2023-09-18-07-15_43.key'),  // Укажите путь к вашему ключу
        cert: fs.readFileSync('/var/www/httpd-cert/dordoi-optom.kg_2023-09-18-07-15_43.crt') // Укажите путь к вашему сертификату
    }, app).listen(config.port, () => {
        console.log(`Server started on ${config.port} port`);
    });
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
