const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const router = express.Router()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// routes
require("./routes/web.routes")(router)
app.use("", router)

//  sync database
/*
const database = require('./models/index');
try {
    const resultado = database.sync();
    console.log(resultado);
} catch (error) {
    console.log(error);
}*/

// server listening to port
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})