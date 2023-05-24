import * as Menu from '../models/menu.mjs' // version 3 with ORM sequelize, postgress



async function showMenuItems(req, res,next) {
  try {
    const menu = await Menu.findMenuByPk(req.params.menuId)
    console.log(menu[0].Name)
    const menuItems = await Menu.getMenuItems(req.params.menuId)
    res.render('menu-items', { Items: menuItems, MenuType: menu[0].Name });
  } catch (error) {
    next(error);
  }
}




async function displayAvailableMenus(req, res, next) {
  try {
    console.log("displayAvailableMenus");
    const menu = await Menu.getAllMenus();
    res.render("../views/menu-list", { menus: menu });
    console.log("entered displayAvailableMenus");
  } catch (error) {
    next(error)
  }
}



const displayMenuItems = async (req, res) => {
  console.log("displayAvailableMenus");
  const menu = await Menu.getAllMenus();
  // console.log(menu);
  const menuItems = [];
  // res.render("../views/menu-list",{menus: menu});
  for (let i = 0; i < menu.length; i++) {
    // console.log(menu[i].Menu_Id);
    const items = await Menu.getMenuItems(menu[i].Menu_Id);
    menuItems.push(items);
  }
  // console.log (menuItems);
  console.log(menuItems.length);
  res.render("../views/menu-list", { menus: menu, Items: menuItems });
  console.log("entered displayMenuItems");
  // next()
}

export { showMenuItems, displayAvailableMenus, displayMenuItems }