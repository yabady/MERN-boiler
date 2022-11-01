// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = (req, res) => {
    res.status(200).json({
        message: "This is a GET request"
    })
}

// @desc    Create goal
// @route   POST /api/goals
// @access  Private
const createGoal = (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error("Add a text field!")
    }
    
    res.status(201).json({
        message: "This is a post request"
    })
}

// @desc    Update goal by "id"
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = (req, res) => {
    res.status(200).json({
        message: `Update id ${req.params.id}`
    })
}

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = (req, res) => {
    res.status(200).json({
        message: `Delete id ${req.params.id}`
    })
}

module.exports = {
    getGoals,
    createGoal,
    deleteGoal,
    updateGoal,
}