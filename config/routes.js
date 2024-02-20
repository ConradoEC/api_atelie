const express = require('express')
const routes = express.Router()
const mysql = require('mysql2')
const {sequelize_schedules} = require('./bd_access/schedules.js')
const {schedulings} = require('./bd_access/schedules.js')
const {sequelize_accounts} = require('./bd_access/schedules.js')
const {accounts} = require('./bd_access/schedules.js')

routes.get('/schedules', (req, res) =>
{
    (async() => {
        await sequelize_schedules.sync()
        const allSchedulings = await schedulings.findAll()
        res.send(allSchedulings)
    })()
})

routes.get('/accounts', (req, res) =>
{
    (async() => {
        await sequelize_accounts.sync()
        const allAccounts = await accounts.findAll()
        res.send(allAccounts)
    })()
})

routes.post('/schedules', (req, res) =>
{
    const title = req.body.title
    const scheduleDate = req.body.title
    const scheduleTime = req.body.title
    const costumerName = req.body.title
    const costumerCell = req.body.title
    const costumerEmail = req.body.title
    const description = req.body.title
    const marker = req.body.title
    const price = req.body.title
    const costumerId = req.body.title

    const newSchedule = schedulings.create({
        title: `${title}`,
        scheduleDate: `${scheduleDate}`,
        scheduleTime: `${scheduleTime}`,
        costumerName: `${costumerName}`,
        costumerCell: `${costumerCell}`,
        costumerEmail: `${costumerEmail}`,
        description: `${description}`,
        marker: `${marker}`,
        price: `${price}`,
        costumerId: `${costumerId}`
    })
    // schedules_connection.query(`INSERT INTO schedule(title, scheduleDate, scheduleTime, client, phone, email, description, marker, price) VALUES ("${title}", "${scheduleDate}", "${scheduleTime}", "${client}", "${phone}", "${email}", "${description}", "${marker}", "${price}")`)
})

routes.post('/newUser', (req, res) =>
{
    const newUserName = req.body.newUserName
    const newUserPassword = req.body.newUserPassword
    const newUserEmail = req.body.newUserEmail

    const thisNewUser = accounts.findOne()

    if(thisNewUser)
    {
        res.send(2, 'Este usuário e esta senha já foram utilizados')
    }
    else
    {
        res.send(3, "Usuário criado com sucesso")
        const newAccount = accounts.create({
            newUserName: `${newUserName}`,
            newUserPassword: `${newUserPassword}`,
            newUserEmail: `${newUserEmail}`
        })
    }
})

routes.post('/login', (req, res) =>  
{
    const userName = req.body.varUserName
    const userPassword = req.body.varUserPassword

    const thisUser = accounts.findOne()

    if(thisUser)
    {
        res.send(3, 'Acesso permitido')
    }
    else
    {
        res.send(2, 'Acesso negado')
    }
})

// just a test

module.exports = routes