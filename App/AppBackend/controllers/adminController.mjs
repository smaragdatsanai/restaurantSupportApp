import * as Owner from '../models/admin.mjs' // version 3 with ORM sequelize, postgress
import * as seqObj from '../models/database.mjs'


const doLogin = async (req, res, next) => {
    const owner = await Owner.login(req.body.username, req.body.password)
    console.log(owner)
    next()
}

const doRegister = async (req, res, next) => {
        const owner = await Owner.addOwner(req.body.FirstName,req.body.LastName,req.body.username,req.body.password,req.body.email)
        console.log(owner)
        next()
}

const findReviews = async (req,res,next) => {
    const reviews = await seqObj.Review.findAll()
    req.reviews = reviews
    console.log(reviews)
    next()
}

export { doRegister, doLogin , findReviews}