const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
    id: {
        type: Number,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: String,
        allowNull: false
    },
    scheduleDate: {
        type: String,
        allowNull: false
    },
    scheduleTime: {
        type: String,
        allowNull: false
    },
    costumerName: {
        type: String,
        allowNull: false
    },
    costumerCell: {
        type: String,
        allowNull: false
    },
    costumerEmail: {
        type: String,
        allowNull: false
    },
    description: 
    {
        type: String,
        allowNull: false
    },
    marker: 
    {
        type: String,
        allowNull: false
    },
    price: {
        type: Number,
        allowNull: false
    },
    costumerId: {
        type: String,
        allowNull: false,
    }
})

const scheduleModel = mongoose.model('schedules', scheduleSchema)



// const Sequelize = require('sequelize')
// const sequelize_schedules = new Sequelize(`${process.env.SCHEDULES_DBNAME}`, `${process.env.SCHEDULES_USER}`, `${process.env.SCHEDULES_PASSWORD}`, {
//     host: process.env.SCHEDULES_HOST,
//     dialect: 'mysql'
// })

// sequelize_schedules.authenticate().then(function(){
//     console.log("Conexão bem estabelecida")
// }).catch(function(error){
//     console.log(`A conexão não foi estabelecida por causa do erro: ${error}`)
// })

// const schedulings = sequelize_schedules.define('schedules', {
// })

// host: '104.21.14.166',

module.exports = scheduleModel