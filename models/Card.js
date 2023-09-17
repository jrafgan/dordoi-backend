const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
    type: String,     // Тип файла
    url: String,      // Путь к загруженному файлу
    fileName: String, // Имя файла
});

const CardSchema = new Schema({
    productTitle: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    selectedBazaar: {
        type: String,
        required: true,
    },
    selectedCategory: {
        type: String,
        required: true,
    },
    selectedSubcategory: {
        type: String,
        required: true,
    },
    sellerPhone: {
        type: String,
        required: true,
    },
    containerRow: {
        type: String,
        required: true,
    },
    containerNumber: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    types: [{ type: String}],
    sku: {
        type: String,
        required: true
    },
    selectedImages: [imageSchema],
    createdAt: {
        type: Date,
        default: Date.now, // Устанавливаем текущую дату при создании
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Устанавливаем текущую дату при создании
    }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;