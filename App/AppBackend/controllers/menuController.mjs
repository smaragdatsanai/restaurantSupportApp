import * as Menu from '../models/menu.mjs' // version 3 with ORM sequelize, postgress
import { Blob } from 'buffer';
import fs from 'fs';
import streamToBuffer from 'stream-to-buffer';

async function showMenuItems(req, res, next) {
  try {
    const menu = await Menu.findMenuByPk(req.params.menuId);
    const menuItems = await Menu.getMenuItems(req.params.menuId);
    console.log(menuItems)
    menuItems.forEach((item) => {
      const blobData=item.Image
      item.Image = Buffer.from(blobData).toString('base64');
    });
    console.log("AFTER BLOB",menuItems)

    // const base64String = 'W29iamVjdCBCbG9iXQ==';
    // const buffer = Buffer.from(base64String, 'base64');
    
    // fs.writeFile('image.jpg', buffer, { encoding: 'base64' }, (err) => {
    //   if (err) {
    //     console.error('Error saving image:', err);
    //   } else {
    //     console.log('Image saved successfully.');
    //   }
    // });

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

async function showRestaurantActiveMenu(req, res, next) {
  try {
    // const restaurant= await Restaurant.getRestaurantById(req.params.restaurantId)
    console.log("entered");
    const menus = await Menu.showActiveMenu(req.params.restaurantId)
    console.log("exited");
    res.render('menu-list', { menus: menus, Restaurant_Id: req.params.restaurantId });
  } catch (error) {
    next(error);
  }
}

async function showRestaurantMenu(req, res, next) {
  try {
    // const restaurant= await Restaurant.getRestaurantById(req.params.restaurantId)
    console.log("entered");
    const menus = await Menu.showRestaurantMenu(req.params.restaurantId)
    console.log("exited");
    res.render('menu-list', { menus: menus, Restaurant_Id: req.params.restaurantId });
  } catch (error) {
    next(error);
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

export { showMenuItems, displayAvailableMenus, displayMenuItems, showRestaurantMenu, showRestaurantActiveMenu }