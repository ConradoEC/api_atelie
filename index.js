const express = require('express')
const app = express()
app.use(express.json())
const PORT = 3000
const routes = require('./config/routes.js')
const dotenv = require('dotenv')

app.use(routes)
dotenv.config()

app.listen(process.env.PORT ? Number(process.env.PORT) : PORT, () => 
{
    console.log("Express started at http://localhost:3000")
})

app.get('/', (req, res) =>
{
    res.send("Bem vindo a página principal da API")
})


