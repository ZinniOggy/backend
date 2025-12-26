require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')


const workoutRoutes = require('./routes/workoutRoutes')
const userRoutes = require('./routes/userRoutes')
const trainerRoutes = require('./routes/trainerRoutes')
const scheduleRoutes = require('./routes/scheduleRoutes')

const app = express()
const PORT = process.env.PORT || 3001


app.use(express.json())
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})


app.get('/check', (req, res) => {
  res.json({ message: 'Server is working!' })
})


app.use('/api/workouts', workoutRoutes)
app.use('/api/users', userRoutes)
app.use('/api/trainers', trainerRoutes)
app.use('/api/schedules', scheduleRoutes)


mongoose.connect(process.env.MongoDB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  })
