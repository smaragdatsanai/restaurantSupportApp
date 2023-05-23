import * as Menu from '../models/menu.mjs' // version 3 with ORM sequelize, postgress


const displayAvailableMenus = async (req, res) => {
    console.log("displayAvailableMenus");
    const menu = await Menu.getAllMenus();
    res.render("../views/menu-list",{menus: menu});
    console.log("entered displayAvailableMenus");
    // next()
}

// const displayAvailableMenus = async (req, res) => {
//   console.log("displayAvailableMenus");
//   const menu = await Menu.getAllMenus();
//   // console.log(menu);
//   const menuItems=[];
//   // res.render("../views/menu-list",{menus: menu});
//   for (let i = 0; i < menu.length; i++) {
//     // console.log(menu[i].Menu_Id);
//     const items=await Menu.getMenuItems(menu[i].Menu_Id);
//     if(items.length<1){
//       continue
//     }
//     else{
//       menu[i].splice(i);
//       menuItems.push(items);
//     }
    
//   }
//   // console.log (menuItems);
//   console.log(menuItems.length);
//   res.render("../views/menu-list",{menus: menu, Items: menuItems});
//   console.log("entered displayMenuItems");
//   // next()
// }

export async function showMenuItems(req,res){
  try{
    // const restaurant= await Restaurant.getRestaurantById(req.params.restaurantId)
    const menuItems= await Menu.getMenuItems(req.params.menuId)
    res.render('menu-items',{Items:menuItems});
  }catch(error){
    res.send(error);
  }
}


const displayMenuItems = async (req, res) => {
  console.log("displayAvailableMenus");
    const menu = await Menu.getAllMenus();
    // console.log(menu);
    const menuItems=[];
    // res.render("../views/menu-list",{menus: menu});
    for (let i = 0; i < menu.length; i++) {
      // console.log(menu[i].Menu_Id);
      const items=await Menu.getMenuItems(menu[i].Menu_Id);
      menuItems.push(items);
    }
    // console.log (menuItems);
    console.log(menuItems.length);
    res.render("../views/menu-list",{menus: menu, Items: menuItems});
    console.log("entered displayMenuItems");
    // next()
}

export {displayAvailableMenus, displayMenuItems }