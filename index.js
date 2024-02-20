const express = require('express')
const routes = require('./config/routes')

const app = express()
const PORT = 3000

app.listen(process.env.PORT ? Number(process.env.PORT) : PORT, () => 
{
    console.log("Express started at http://localhost:3000")
})

app.get('/', (req, res) =>
{
    res.send("Bem vindo a página principal da API")
})

app.use(routes)

