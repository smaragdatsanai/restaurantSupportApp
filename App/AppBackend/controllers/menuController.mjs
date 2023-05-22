import * as Menu from '../models/menu.mjs' // version 3 with ORM sequelize, postgress


const displayAvailableMenus = async (req, res) => {
    console.log("displayAvailableMenus");
    const menu = await Menu.getAllMenus();
    console.log(menu);
    for (let i = 0; i < menu.length; i++) {
      const items=await Menu.getMenuItems(menu[i].Menu_Id);
      res.render("../views/menu-list",{menus: menu,menuItems: items});
    }
    
    console.log("entered displayAvailableMenus");
    // next()
}

const displayMenuItems = async (req, res) => {
        const user = await Menu.getMenuItems(id)
        console.log(user)
        // next()
}

export {displayAvailableMenus, displayMenuItems }