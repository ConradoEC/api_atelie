const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    id: {
        type: Number,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    recipeName: {
        type: String,
        allowNull: false
    },
    recipePrice: {
        type: Number,
        allowNull: false
    },
    recipeDescription: {
        type: String,
        allowNull: false
    },
    userId: {
        type: String,
        allowNull: false
    }
})

const recipeModel = mongoose.model('recipes', recipeSchema)

module.exports = recipeModel