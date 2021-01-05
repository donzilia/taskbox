const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const session = require('express-session');
dotenv.config({ path: __dirname + '/.env' })


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

hbs.registerHelper('for', function (from, to, incr, block) {
	var accum = '';

	for (var i = from; i < to; i += incr) {
		for (let j = 0; j < block[i].length; j++) {
			if (j > 1) {
				accum += `<span class="badge badge-pill mr-1" style="background-color: lightgray">...</span>`;
				break;
			}
			let tag = block[i][j][0].dataValues
			accum += `<span class="badge badge-pill mr-1" style="background-color: ${tag.color}">${tag.title}</span>`;
		}
	}
	return accum;
});

hbs.registerHelper('tagCount', function(property, id) {
	return property[id];
})

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes
require("./routes/web.routes")(router)
app.use("", router)

// server listening to port
app.listen(port, () => {
	console.log('Server is up on port ' + port)
})