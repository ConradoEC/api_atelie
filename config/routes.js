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
        ready: 0,
        userId: req.body.userId
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
    const newMarker = await markerModel.create({
        markerName: req.body.markerName,
        userId: req.body.userId
    })

    res.status(200).send('Rótulo criado')
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

routes.delete('/deleteSchedules:id', async(req, res) => 
{
    stringId = await req.params.id
    var ids = await stringId.split('#')
    await ids.pop() 

    console.log(stringId)

    const deleteSchedule = await scheduleModel.deleteMany({_id: ids})

    // await ids.forEach(item => async function()
    // {
    //     if(item != '')
    //     {
    //         const deleteSchedule = await scheduleModel.deleteOne({_id: item})
    //         .then(() => 
    //         {
    //             console.log('deletado')
    //             res.send('deletado')
    //         })
    //         .catch((error) => 
    //         {
    //             console.log(error)
    //             res.send(error)
    //         })
    //     }
        
    // })

    // {
    //     "title": "aa3",
    //     "scheduleDate": "03/07/2024",
    //     "scheduleTime": "01:55",
    //     "costumerName": "aa",
    //     "costumerCell": "(22) 22333-2222",
    //     "costumerEmail": "www",
    //     "description": "aaa",
    //     "marker": "Sem rótulo",
    //     "price": 4455,
    //     "ready": 1,
    //     "userId": "65ee227ca5ea1bed2166ed6b"
    // }

    if(res.statusCode == 200)
    {
        console.log("Deletado ")
        res.send('Deletado')
    }
    else
    {
        console.log("Falhou " + res.statusCode)
        res.send("Falhou " + res.statusCode)
    }
})

module.exports = routes