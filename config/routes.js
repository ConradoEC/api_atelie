const express = require('express')
const routes = express.Router()
const mysql = require('mysql2')
const dotenv = require('dotenv')
const json = express.json()
dotenv.config()

const scheduleModel = require('./bd_access/schedules.js')
const accountsModel = require('./bd_access/accounts.js')

routes.get('/schedules', (req, res) =>
{
    const allSchedules = scheduleModel.find({})
    // res.send(JSON.parse(allSchedules))

    // (async() => {
    //     await sequelize_schedules.sync()
    //     const allSchedulings = await schedulings.findAll()
    //     res.send(allSchedulings)
    // })()
})

routes.get('/accounts', (req, res) =>
{
    const allAccounts = accountsModel.find({})
    // console.log(JSON.parse(allAccounts))
    

    // (async() => {
    //     await sequelize_accounts.sync()
    //     const allAccounts = await accounts.findAll()
    //     res.send(allAccounts)
    // })()
})

routes.post('/schedules', (req, res) =>
{
    const title = req.body.title
    const scheduleDate = req.body.scheduleDate
    const scheduleTime = req.body.scheduleTime
    const costumerName = req.body.costumerName
    const costumerCell = req.body.costumerCell
    const costumerEmail = req.body.costumerEmail
    const description = req.body.description
    const marker = req.body.marker
    const price = req.body.price
    const costumerId = req.body.costumerId

    const newSchedule = scheduleModel.create({
        title: `${title}` ,
        scheduleDate: `${scheduleDate}` ,
        schedulingTime: `${scheduleTime}` ,
        costumerName: `${costumerName}` ,
        costumerCell: `${costumerCell}` ,
        costumerEmail: `${costumerEmail}` ,
        description: `${description}` ,
        marker: `${marker}` ,
        price: `${price}` ,
        costumerId: `${costumerId}`
    })


    // const newSchedule = schedulings.create({
    //     title: `${title}`,
    //     scheduleDate: `${scheduleDate}`,
    //     scheduleTime: `${scheduleTime}`,
    //     costumerName: `${costumerName}`,
    //     costumerCell: `${costumerCell}`,
    //     costumerEmail: `${costumerEmail}`,
    //     description: `${description}`,
    //     marker: `${marker}`,
    //     price: `${price}`,
    //     costumerId: `${costumerId}`
    // })
})

routes.post('/newUser', (req, res) =>
{
    const newUserName = req.body.newUserName
    const newUserPassword = req.body.newUserPassword
    const newUserEmail = req.body.newUserEmail

    const sameUser = accountsModel.findOne({
        userName: `${newUserName}`,
        userEmail: `${newUserEmail}`
    }).exec()


    if(sameUser)
    {
        res.send(2, 'Este email e usuário já estão sendo utilizados')
    }
    else
    {
        res.send(3, "Usuário criado com sucesso")
        const newUser = accountsModel.create({
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

    const thisUser = accountsModel.findOne({
        userName: `${userName}`,
        userPassword: `${userPassword}`
    }).exec()

    if(thisUser)
    {
        res.send(thisUser, 'Acesso permitido')
    }
    else
    {
        res.send(thisUser, 'Acesso negado')
    }
})

// just a test

module.exports = routes