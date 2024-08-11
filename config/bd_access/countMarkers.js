const mongoose = require('mongoose')

const counterSchema = mongoose.Schema({
    id: {
        type: Number,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: String,
        allowNull: false
    },
    nameCounterMarker: {
        type: String,
        allowNull: false
    },
    numberCounterMarker: {
        type: Number,
        allowNull: false
    }
})

const counterModel = mongoose.model('counterMarker', counterSchema)

module.exports = counterModel