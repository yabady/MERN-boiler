const mongooes = require('mongoose')

const userSchema = mongooes.Schema({
    name: {
        type: String,
        required: [true, "ADD NAME"]
    },
    email: {
        type: String,
        required: [true, "ADD email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "ADD password"]
    },
},
{
    timestamps: true
})

module.exports = mongooes.model("User", userSchema)