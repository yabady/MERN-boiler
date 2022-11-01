// Default we use .then.catch syntax but since we are making promises with mongoose we made the function async that uses try catch we instead use the express async handler and use error handler instead (throw new Error(...))
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel.js')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

// @desc    Create goal
// @route   POST /api/goals
// @access  Private
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Add a text field!")
    }

    const goal = await Goal.create({
        text: req.body.text,
    })

    res.status(201).json(goal)
}) 

// @desc    Update goal by "id"
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal){
        res.status(400)
        throw new Error("oal was not found!")
    } 

    //if goal does not exist just create new
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true,})
    res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error("Goal was not found!")
    }

    await goal.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    createGoal,
    deleteGoal,
    updateGoal,
}