const mongoose = require('mongoose')


const goalSchema = mongoose.Schema({
    text: {
        type: String,
        require: [true, "ADD TEXT VALUE!"]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("Goal", goalSchema)