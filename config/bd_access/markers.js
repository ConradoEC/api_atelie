const mongoose = require('mongoose');

const markerSchema = mongoose.Schema({
    id: {
        type: Number,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    markerName: {
        type: String,
        allowNull: false
    },
    userId: {
        type: String,
        allowNull: false
    }
})

const markerModel = mongoose.model('markers', markerSchema)

module.exports = markerModel