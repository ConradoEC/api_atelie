const mongoose = require('mongoose')

const accountsSchema = new mongoose.Schema({
    id: {
            type: Number,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
    userName: {
            type: String,
            allowNull: false,
            required: true
        },
    userPassword: {
            type: String,
            allowNull: false,
            minLength: 5,
            required: true
        },
    userEmail: {
            type: String,
            allowNull: false,
            required: true
        }
})

const accountsModel = mongoose.model('accounts', accountsSchema)

// const Sequelize = require('sequelize')
// const sequelize_accounts = new Sequelize(`${process.env.ACCOUNTS_DBNAME}`, `${process.env.ACCOUNTS_USER}`, `${process.env.ACCOUNTS_PASSWORD}`, {
//     host: process.env.ACCOUNTS_HOST,
//     dialect: 'mysql'
// })

// sequelize_accounts.authenticate().then(() => {
//     console.log('Conexão bem sucedida')
// }).catch(() => {
//     console.log(`A conexão não foi estabelecida por causa do erro: ${error}`)
// })

// const accounts = sequelize_accounts.define('accounts', {
// })

module.exports = accountsModel