import * as User from '../models/user.mjs' // version 3 with ORM sequelize, postgress


const doLogin = async (req, res, next) => {
    const user = await User.login(req.body.username, req.body.password)
    console.log(user)
    next()
}

const doRegister = async (req, res, next) => {
    // console.log(req.body["username"]);
    try {
        await User.addUser({
            "Username": req.body["username"],
            "Password": req.body["password"],
            "Email": req.body["email"],
        })
        next()
    } catch (error) {
        next(error)
    }
}

export { doRegister, doLogin }