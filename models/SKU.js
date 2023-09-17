const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skuSchema = new Schema({
    sku: { type: String }
});

const SKU = mongoose.model('SKU', skuSchema);

module.exports = SKU;