const Schedule = require('../models/scheduleModel')
const User = require('../models/userModel')

const scheduleWorkout = async (req, res) => {
  const { user, trainer, workoutType, scheduledAt, notes } = req.body

  const foundUser = await User.findById(user)

  if (!foundUser || foundUser.membershipType === 'basic') {
    return res.status(403).json({ error: 'Upgrade membership required' })
  }

  const schedule = await Schedule.create({
    user, trainer, workoutType, scheduledAt, notes
  })

  res.status(201).json(schedule)
}

module.exports = { scheduleWorkout }
