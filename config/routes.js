const express = require('express')
const routes = express.Router()
routes.use(express.json())
const mysql = require('mysql2')
const connectionMongoDB = require('./bd_access/connectionMongoDB.js')
const scheduleModel = require('./bd_access/schedules.js')
const accountsModel = require('./bd_access/accounts.js')
const recipeModel = require('./bd_access/recipes.js')
const markerModel = require('./bd_access/markers.js')
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

routes.get('/recipes', async(req, res) => 
{
    const allRecipes = await recipeModel.find({})
    res.send(allRecipes)
})

routes.get('/accounts', async(req, res) =>
{
    const allAccounts = await accountsModel.find({})
    res.send(allAccounts)
    // console.log(JSON.parse(allAccounts))
    

    // (async() => {
    //     await sequelize_accounts.sync()
    //     const allAccounts = await accounts.findAll()
    //     res.send(allAccounts)
    // })()
})

routes.get('/markers', async(req, res) => 
{
    const allMarkers = await markerModel.find({})
    res.send(allMarkers)
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

routes.post('/recipes', async(req, res) => 
{
    const newRecipe = await recipeModel.create({
        recipeName: req.body.recipeName,
        recipePrice: req.body.recipePrice,
        recipeDescription: req.body.recipeDescription,
        userId: req.body.userId 
    })

    res.status(200).send('Receita criada')
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

routes.post('/markers', async(req, res) => 
{
    const newMarker = markerModel.create({
        markerName: req.body.markerName,
        userId: req.body.userId
    })
})

routes.post('/login', async(req, res) =>  
{
    const thisUser = await accountsModel.findOne({
        userName: req.body.userName,
        userPassword: req.body.userPassword
    }).exec()

    if(thisUser)
    {
        
        res.send([thisUser])
    }
    else
    {
        
        res.send("nothing")
    }
})


module.exports = routes