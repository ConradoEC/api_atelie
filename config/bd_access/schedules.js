const Sequelize = require('sequelize')
const sequelize_schedules = new Sequelize(process.env.SCHEDULES_DBNAME, process.env.SCHEDULES_USER, process.env.SCHEDULES_PASSWORD, {
    host: process.env.SCHEDULES_HOST,
    dialect: 'mysql'
})

sequelize_schedules.authenticate().then(function(){
    console.log("Conexão bem estabelecida")
}).catch(function(error){
    // console.log(`A conexão não foi estabelecida por causa do erro: ${error)
})

const schedulings = sequelize_schedules.define('schedules', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    schedulingDate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    schedulingTime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    costumerName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    costumerCell: {
        type: Sequelize.STRING,
        allowNull: false
    },
    costumerEmail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: 
    {
        type: Sequelize.TEXT,
        allowNull: false
    },
    marker: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    costumerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

// host: '104.21.14.166',

module.exports = {sequelize_schedules, schedulings}