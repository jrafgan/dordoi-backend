const {expressjwt: jwt} = require('express-jwt');
const config = require('../config'); // Замените на ваш секретный ключ

// Этот middleware будет проверять JWT токены для всех запросов
const authMiddl = jwt({
    secret: config.jwtSecret, // Секретный ключ для создания и проверки токенов
    algorithms: ['HS256'], // Алгоритм хеширования (HS256 - самый популярный)
    getToken: function(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            console.log('auth in process', req.headers.authorization.split(' ')[1])
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/public'] });

// authMiddl.unless = function (options) {
//     return function (req, res, next) {
//         jwt(options)(req, res, function (err) {
//             if (!err) {
//                 // После успешной аутентификации, устанавливаем информацию о пользователе
//                 // В данном примере, мы предполагаем, что информация о пользователе хранится в поле decoded
//                 req.user = req.user || req.decoded;
//                 console.log('req user : ', req.user);
//             }
//             next(err);
//         });
//     };
// };

module.exports = authMiddl;
