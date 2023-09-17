const express = require('express');
const Rating = require('../models/Rating');
const router = express.Router();
const permit = require('../middleware/permit');

router.get('/', async (req, res, next) => {
    try {
        let criteria = {};

        if (req.query.card) {
            criteria.card = req.query.card;
        }

        const ratings = await Rating.find(criteria).populate("card").populate("user");
        res.send(ratings);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const criteria = { card: req.params.id };
        const rating = await Rating.find(criteria).populate("user").populate("card");

        if (rating) {
            res.send(rating);
        } else {
            next({ status: 404, message: 'Rating not found' });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', (req, res, next) => {
    let ratingData = req.body;
    ratingData.user = req.user._id;

    const rating = new Rating(ratingData);
    rating.save()
        .then(() => res.send({ message: 'Ok' }))
        .catch(error => next(error));
});

router.delete('/', permit('admin'), async (req, res, next) => {
    try {
        const id = req.query.id;
        const rating = await Rating.findById(id);

        if (rating) {
            await rating.remove();
            res.status(200).send({ message: "Ok" });
        } else {
            next({ status: 404, message: 'Rating not found' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
