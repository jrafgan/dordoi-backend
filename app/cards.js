const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid }= require('nanoid');
const config = require('../config');
const Card = require('../models/Card');
const router = express.Router();
const permit = require('../middleware/permit');
const auth = require('../middleware/auth')
const SKU = require("../models/SKU");
const { searchCardsByKeywords } = require("../middleware/functions");
const { uniqueSku  } = require("../middleware/functions");
const { createToken } = require("../middleware/functions");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }); //get all cards

router.get('/', async (req, res) => {
    try {
        const cards = await Card.find();
        res.send({ cards });
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/user/:id', auth, async (req, res) => {
    try {
        const userId = req.params.id;

        // Используйте userId в запросе к базе данных для поиска карточек, связанных с этим пользователем
        const cards = await Card.find({ user: userId });
        const newToken = createToken(userId);
        const user = { _id: userId };
        res.send({ token: newToken,  message: 'Cards found !',  user, cards });
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/search', async (req, res) => {
    try {
        const keyword = req.query.keyword;
        console.log('req query : ', keyword);
        const cards = await Card.find();
        const foundCards = searchCardsByKeywords(cards, keyword)

        if (foundCards) {
            res.send({ cards: foundCards });
        } else {
            res.send({ message: 'По вашему запросу ничего не найдено !'});
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', auth, upload.array('images'), async (req, res) => {
    try {
        const cardData = req.body;
        const uploadedFiles = req.files;
        let sku = await  uniqueSku(12);

        console.log('req body : ', cardData);
        console.log('req files : ', req.files);
        // Проверяем, существует ли req.files и является ли это массивом
        const selectedImages = [];

        // Перебираем каждый загруженный файл и добавляем информацию о нем в массив
        for (const file of uploadedFiles) {
            selectedImages.push({
                type: file.fieldname, // Здесь можете указать тип файла, если он имеется
                url: `https://dordoi-optom.kg/uploads/${file.filename}`, // Путь к загруженному файлу в каталоге uploads
                fileName: file.originalname, // Имя файла
            });
        }

        const card = new Card({
            productTitle: cardData.productTitle,
            productDescription: cardData.productDescription,
            selectedBazaar: cardData.selectedBazaar,
            selectedCategory: cardData.selectedCategory,
            selectedSubcategory: cardData.selectedSubcategory,
            sellerPhone: cardData.sellerPhone,
            containerRow: cardData.containerRow,
            containerNumber: cardData.containerNumber,
            user: cardData.user,
            selectedImages: selectedImages,
            types: cardData.types,
            price: cardData.price,
            sku,
            createdAt: cardData.createdAt,
            updatedAt: cardData.updatedAt || null
        });

        await card.save();
        const newToken = createToken(cardData.user);
        const user = { _id: cardData.user }
        console.log('new card : ', card)
        const cards = await Card.find();
        sku = new SKU({ sku });

        // Сохраняем продукт в базе данных
        await sku.save();
        // Отправляем новый токен на клиент
        res.send({ token: newToken,  message: 'Card created!',  user, cards });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).send(error);
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.query.user; // Получить идентификатор пользователя из запроса
        console.log('req user : ', userId);
        if (!id) {
            return res.status(400).send({ message: 'Missing id parameter' });
        }

        const card = await Card.findById(id);

        if (!card) {
            return res.status(404).send({ message: 'Card not found' });
        }

        // Проверить, является ли текущий пользователь владельцем карточки
        if (card.user.toString() !== userId) {
            return res.status(403).send({ message: 'Unauthorized - You do not own this card' });
        }

        // Если пользователь - владелец карточки, тогда производим удаление
        await Card.deleteOne({ _id: id })

        const newToken = createToken(card.user);
        const user = { _id: card.user };

        const cards = await Card.find();
        res.status(200).send({ cards, message: 'Card deleted!', user, token: newToken });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
