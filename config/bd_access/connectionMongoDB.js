const mongoose = require('mongoose')

const connectionMongoDB = async() => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@bd-atelie.iqjgpka.mongodb.net/?retryWrites=true&w=majority&appName=bd-Atelie`)
    .then(() => {
        console.log('Funcionou')
    })
    .catch((error) => {
        console.log(`${process.env.DB_USER} e ${process.env.DB_PASSWORD}`)
        console.log('Não Funcionou por causa do erro: ' + error)
    })
}


module.exports = connectionMongoDB;