const express = require('express')
const routes = express.Router()
routes.use(express.json())
const mysql = require('mysql2')
const connectionMongoDB = require('./bd_access/connectionMongoDB.js')
const scheduleModel = require('./bd_access/schedules.js')
const accountsModel = require('./bd_access/accounts.js')
const dotenv = require('dotenv')

dotenv.config()
connectionMongoDB()

routes.get('/schedules', async(req, res) =>
{
    const allSchedules = await scheduleModel.find({})
    res.send(allSchedules)

    // (async() => {
    //     await sequelize_schedules.sync()
    //     const allSchedulings = await schedulings.findAll()
    //     res.send(allSchedulings)
    // })()
})

routes.get('/accounts', async(req, res) =>
{
    const allAccounts = await accountsModel.findOne({userName: 'Erick'})
    res.send(allAccounts)
    // console.log(JSON.parse(allAccounts))
    

    // (async() => {
    //     await sequelize_accounts.sync()
    //     const allAccounts = await accounts.findAll()
    //     res.send(allAccounts)
    // })()
})

routes.post('/schedules', async(req, res) =>
{
    const title = await req.body.title
    const scheduleDate = await req.body.scheduleDate
    const scheduleTime = await req.body.scheduleTime
    const costumerName = await req.body.costumerName
    const costumerCell = await req.body.costumerCell
    const costumerEmail = await req.body.costumerEmail
    const description = await req.body.description
    const marker = await req.body.marker
    const price = await req.body.price
    const costumerId = await req.body.costumerId

    const newSchedule = await scheduleModel.create({
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

routes.post('/newUser', async(req, res) =>
{
    const samePassword = await accountsModel.findOne({
        userPassword: req.body.userPassword
    })

    const sameEmail = await accountsModel.findOne({
        userEmail: req.body.userEmail
    })

    if(samePassword || sameEmail)
    {
        res.send('2')
    }
    else
    {
        console.log('Esse é o body ' + req.body)
        const newUser = await accountsModel.create({
            userName: req.body.userName,
            userPassword: req.body.userPassword,
            userEmail: req.body.userEmail
        })
        // res.status(200).json(newUser)
        res.status(200).send('Usuário criado')
    }
})

routes.post('/login', async(req, res) =>  
{
    const thisUser = await accountsModel.findOne({
        userName: req.body.userName,
        userPassword: req.body.userPassword
    }).exec()

    if(thisUser)
    {
        res.send(['1', thisUser])
    }
    else
    {
        res.send('2')
    }
})

// just a test

module.exports = routes