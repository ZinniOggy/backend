const User = require('../models/userModel')


const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}


const getUsers = async (req, res) => {
  const { active, membershipType } = req.query
  let filter = {}

  if (active) filter.active = active
  if (membershipType) filter.membershipType = membershipType

  const users = await User.find(filter)
  res.json(users)
}


const getUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(user)
}


const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(user)
}


const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({ message: 'User deleted' })
}

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser }
