console.log('mulai....')
var express = require('express')
var cors = require('cors')
var morgan = require('morgan');
var secure = require('ssl-express-www')

const PORT = process.env.PORT || 8080

var mainrouter = require('./main')

var app = express()
app.enable('trust proxy');
app.use(morgan('dev'));
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("public"))

app.use('/', mainrouter)


app.listen(PORT, () => {
    console.log('menghubungkan...')
    console.log("server siap di http://localhost:" + PORT)
})

module.exports = app
