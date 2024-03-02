const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    images: [String],
    timestamps: {
        creation: { type: Date, default: Date.now },
        update: { type: Date, default: Date.now }
    }
});

module.exports = mongoose.model('PortfolioItem', portfolioItemSchema);