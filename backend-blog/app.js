
require('dotenv').config()
const express = require('express')
const app= express()
const cors = require('cors')


const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

require('./mongo')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())


app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login',loginRouter)



module.exports = app

