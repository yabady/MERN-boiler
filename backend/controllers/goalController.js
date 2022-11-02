// Default we use .then.catch syntax but since we are making promises with mongoose we made the function async that uses try catch we instead use the express async handler and use error handler instead (throw new Error(...))
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel.js')
const User = require('../models/userModel.js')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id})
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
        user: req.user.id
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

    const user = await User.findById(req.user.id)

    // check for user
    if(!user){
        res.status(401)
        throw new Error('User not Found')
    }

    // Make sure the logged user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("User not authorized")
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

    const user = await User.findById(req.user.id)

    // check for user
    if(!user){
        res.status(401)
        throw new Error('User not Found')
    }

    // Make sure the logged user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("User not authorized")
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