const path = require('path');
const rootPath = __dirname;
require('dotenv').config();

let dbUrl = process.env.DB_URL; // Добавил URL базы данных по умолчанию
let jwtSecret = process.env.JWT_SECRET; // Добавил секретный ключ JWT по умолчанию

if (process.env.NODE_ENV === 'development') {
    dbUrl = 'mongodb://localhost/dordoi';
    console.log(' frontend ENV : ', process.env.NODE_ENV);
}

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    dbUrl, // Используем переменную dbUrl, которую мы определили выше
    mongoOptions: {
        useNewUrlParser: true, // Используйте новый парсер URL
        useUnifiedTopology: true, // Используйте новую единую топологию
        // Другие опции, если необходимо
    },
    jwtSecret, // Используем переменную jwtSecret, которую мы определили выше
};



// const path = require('path');
// const rootPath = __dirname;
// require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
//
// const port = process.env.PORT;
// let dbUrl = process.env.DB_URL;
// const apiUrl = process.env.API_URL;
// const jwtSecret = process.env.JWT_SECRET;
// const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME;
//
// if (process.env.NODE_ENV === 'development') {
//     console.log('Режим разработки');
//     // Логика для разработки
// } else if (process.env.NODE_ENV === 'production') {
//     console.log('Режим продакшн');
// }
//
// module.exports = {
//     rootPath,
//     uploadPath: path.join(rootPath, 'public/uploads'),
//     dbUrl: 'mongodb://localhost/dordoi',
//     mongoOptions: {
//         useNewUrlParser: true, // Используйте новый парсер URL
//         useUnifiedTopology: true, // Используйте новую единую топологию
//         // Другие опции, если необходимо
//     },
//     jwtSecret: 'dordoi-front-backend'
// };