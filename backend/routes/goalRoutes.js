const { getGoals, createGoal, deleteGoal, updateGoal } = require('../controller/goalController')
const express = require("express")
const router = express.Router()


router.get('/', getGoals)

router.post('/', createGoal)

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal)


module.exports = router