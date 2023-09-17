const SKU = require("../models/SKU");
const jwt = require("jsonwebtoken");
const config = require('../config');
require('dotenv').config();

const duration = process.env.JWT_EXPIRATION_TIME;

const createToken = (userId) => {
    return jwt.sign({userId}, config.jwtSecret, {expiresIn: duration});
};

async function uniqueSku(length) {
    try {
        let sku = '';
        let isUnique = false;

        // Генерируем артикул до тех пор, пока не найдем уникальный
        while (!isUnique) {
            // sku = nanoid(12); // Генерируем случайный артикул из 12 символов

            const characters = '0123456789';

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                sku += characters[randomIndex];
            }

            // Проверяем, есть ли артикул в базе данных
            const existingSKU = await SKU.findOne({sku});

            if (!existingSKU) {
                isUnique = true; // Артикул уникален
            }
            const yu = await SKU.find()
            console.log('existing SKU : ', yu);
        }
        return sku;
    } catch (e) {
        console.log('creating SKU error : ', e);
    }
}

function searchCardsByKeywords(cards, keywords) {
    try {
        const results = [];
        const searchWords = keywords.toLowerCase().split(' ');
        console.log('keywords : ', searchWords);

        for (const card of cards) {
            const title = card.productTitle.toLowerCase();
            const description = card.productDescription.toLowerCase();
            const category = card.selectedCategory.toLowerCase();

            let foundTitle = true;
            let foundDescription = true;
            let foundCategory = true;

            for (const keyword of searchWords) {
                const titleRegex = new RegExp(`\\b${keyword}`, 'i'); // Начало слова
                const descriptionRegex = new RegExp(`\\b${keyword}`, 'i');
                const categoryRegex = new RegExp(`\\b${keyword}`, 'i');

                if (foundTitle && (!title.includes(keyword) && !title.match(titleRegex))) {
                    foundTitle = false;
                }
                if (foundDescription && (!description.includes(keyword) && !description.match(descriptionRegex))) {
                    foundDescription = false;
                }
                if (foundCategory && (!category.includes(keyword) && !category.match(categoryRegex))) {
                    foundCategory = false;
                }
            }

            if (foundTitle || foundDescription || foundCategory) {
                results.push(card);
            }
        }

        return results;
    } catch (e) {
        console.log('card search error : ', e);
    }
}


module.exports = {createToken, uniqueSku, searchCardsByKeywords}