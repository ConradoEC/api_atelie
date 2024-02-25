const Sequelize = require('sequelize')
const sequelize_accounts = new Sequelize(process.env.ACCOUNTS_DBNAME, process.env.ACCOUNTS_USER, `${process.env.ACCOUNTS_PASSWORD}`, {
    host: process.env.ACCOUNTS_HOST,
    dialect: 'mysql'
})

sequelize_accounts.authenticate().then(() => {
    console.log('Conexão bem sucedida')
}).catch(() => {
    console.log(error.message)
})

const accounts = sequelize_accounts.define('accounts', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    userPassword: {
        type: Sequelize.STRING,
        allowNull: false,
        minLength: 5,
        required: true
    },
    userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    }
})

module.exports = {sequelize_accounts, accounts}