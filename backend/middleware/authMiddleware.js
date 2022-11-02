const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js')


// we create this middle function to be ran during the req/res cycle. we need to include next arg for middleware functions
const protect = asyncHandler(async (req,res,next) => {

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get token from header
            //header auth example: "Bearer token"
            // we are spliting the token from bearer
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get User from token without password field
            req.user = await User.findById(decoded.id).select('-password')

            // Call next middleware
            next()
        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error("Not Authorized, no token")
    }

})


module.exports = {protect}