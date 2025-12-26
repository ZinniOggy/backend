const Trainer = require('../models/trainerModel')


const createTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body)
    res.status(201).json(trainer)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getTrainers = async (req, res) => {
  const { specialization, available } = req.query
  let filter = {}

  if (specialization) {
    filter.specialization = specialization
  }

  if (available !== undefined) {
    filter.available = available
  }

  const trainers = await Trainer.find(filter)
  res.status(200).json(trainers)
}


const getTrainer = async (req, res) => {
  const trainer = await Trainer.findById(req.params.id)

  if (!trainer) {
    return res.status(404).json({ error: 'Trainer not found' })
  }

  res.status(200).json(trainer)
}


const updateTrainer = async (req, res) => {
  const trainer = await Trainer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  if (!trainer) {
    return res.status(404).json({ error: 'Trainer not found' })
  }

  res.status(200).json(trainer)
}


const deleteTrainer = async (req, res) => {
  const trainer = await Trainer.findByIdAndDelete(req.params.id)

  if (!trainer) {
    return res.status(404).json({ error: 'Trainer not found' })
  }

  res.status(200).json({ message: 'Trainer deleted successfully' })
}

module.exports = {
  createTrainer,
  getTrainers,
  getTrainer,
  updateTrainer,
  deleteTrainer
}
