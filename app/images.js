const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const Image = require('../models/SKU');
const router = express.Router();
const permit = require('../middleware/permit');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
    try {
        let images;

        if (req.query.card) {
            const criteria = { card: req.query.card };
            images = await Image.find(criteria);
        } else {
            images = await Image.find();
        }

        res.send(images);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        let imageData = req.body;

        if (req.file) {
            imageData.image = req.file.filename;
        }
        imageData.card = req.body.card;

        const image = new Image(imageData);
        await image.save();

        const images = await Image.find();
        res.send(images);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/', permit('admin'), async (req, res) => {
    try {
        const id = req.query.id;
        const image = await Image.findById(id);

        if (image) {
            await image.remove();
            const images = await Image.find();
            res.status(200).send(images);
        } else {
            res.status(400).send('Not found!');
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
