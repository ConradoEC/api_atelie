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
    const scheduleDate = req.body.title
    const scheduleTime = req.body.title
    const costumerName = req.body.title
    const costumerCell = req.body.title
    const costumerEmail = req.body.title
    const description = req.body.title
    const marker = req.body.title
    const price = req.body.title
    const costumerId = req.body.title

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
        res.send(3, 'Acesso permitido')
    }
    else
    {
        res.send(2, 'Acesso negado')
    }
})

// just a test

module.exports = routes