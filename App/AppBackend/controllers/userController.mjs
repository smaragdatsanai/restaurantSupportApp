import * as User from '../models/user.mjs' // version 3 with ORM sequelize, postgress


const doLogin = async (req, res, next) => {
    const user = await User.login(req.body.username, req.body.password)
    console.log(user)
    next()
}

const doRegister = async (req, res, next) => {
        const user = await User.addUser(req.body.username,req.body.password,req.body.email)
        console.log(user)
        next()
}

export { doRegister, doLogin }