const { getGoals, createGoal, deleteGoal, updateGoal } = require('../controllers/goalController')
const { protect } = require('../middleware/authMiddleware.js')
const express = require("express")
const router = express.Router()


router.get('/', protect, getGoals)

router.post('/', protect, createGoal)

router.put('/:id', protect, updateGoal)

router.delete('/:id', protect, deleteGoal)


module.exports = router