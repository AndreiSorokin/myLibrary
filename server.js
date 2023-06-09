if(process.env.NODE_ENV !== 'production') {
   require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('123'))

const indexRouter = require('./routes/index')
const { error } = require('console')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)