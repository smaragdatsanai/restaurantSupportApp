import * as Menu from '../models/menu.mjs' // version 3 with ORM sequelize, postgress


const displayAvailableMenus = async (req, res, next) => {
    const menu = await Menu.getAllMenus()
    console.log(menu)
    next()
}

const displayMenuItems = async (req, res, next) => {
        const user = await Menu.getMenuItems(id)
        console.log(user)
        next()
}

export { doRegister, doLogin }