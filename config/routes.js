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
    const newSchedule = await scheduleModel.create({
        title: req.body.title,
        scheduleDate: req.body.scheduleDate,
        scheduleTime: req.body.scheduleTime,
        costumerName: req.body.costumerName,
        costumerCell: req.body.costumerCell,
        costumerEmail: req.body.costumerEmail,
        description: req.body.description,
        marker: req.body.marker,
        price: req.body.price,
        costumerId: req.body.costumerId
    })

    res.status(200).send('Agendamento criado criado')
})

routes.post('/updateSchedule', async(req, res) => {
    const updateSchedule = await scheduleModel.updateOne(
        {"_id": req.body._id},
        req.body)
    .then(() => {
        res.send("Atualizado com sucesso")
    })
    .catch((error) => {
        res.send("Ocorreu um erro na atualização: " + error)
    })
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
        res.send([{"resNumber": 1}, thisUser])
    }
    else
    {
        res.send([{"resNumber": 2}, {"resText": "Não foi possível verificar o usuário, consulte sua internet"}])
    }
})


module.exports = routes