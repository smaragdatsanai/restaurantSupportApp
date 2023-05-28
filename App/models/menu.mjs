import { Menu } from "./database.mjs"
import { Menu_Item } from "./database.mjs"
import { Op } from 'sequelize';
import { sequelize } from './dbConfig.mjs';


export async function getAllMenus() {
  try {
    console.log("getAllMenus");
    const menu = await Menu.findAll({});
    return menu.map(item => item.toJSON());
  } catch (error) {
    console.error('Error retrieving menu:', error);
  }
}

export async function showRestaurantMenu(resId){
  try {
    const menu = await Menu.findAll({
      where: {
        RestaurantId: resId
      }
    });
    return menu.map(item => item.toJSON());
  } catch (error) {
    console.error('Error retrieving Menu_Items:', error);
    return [];
  }
}

export async function showActiveMenu(resId) {
  try {
    const currentTime = new Date();
    const options = { timeZone: 'Europe/Athens', hour12: false };
    const currentTimeString = currentTime.toLocaleString('en-US', options).substr(11, 8);

    const menu = await Menu.findAll({
      where: {
        RestaurantId:resId,
        [Op.or]: [
          {
            Active_from: {
              [Op.lte]: currentTimeString,
            },
            Active_until: {
              [Op.gte]: currentTimeString,
            },
          },
          {
            Active_from: {
              [Op.gte]: sequelize.col('Active_until'),
            },
            Active_until: {
              [Op.gte]: currentTimeString,
            },
          },
          {
            Active_from: {
              [Op.gte]: sequelize.col('Active_until'),
            },
            Active_until: {
              [Op.lte]: currentTimeString,
            },
          },
        ],
      },
    });

    console.log(currentTimeString);

    return menu.map((item) => item.toJSON());
  } catch (error) {
    console.error('Error retrieving Menus:', error);
  }
}


export async function getMenuItems(menuId){
  try {
    const menuItems = await Menu_Item.findAll({
      where: {
        MenuId: menuId
      }
    });
    return menuItems.map(item => item.toJSON());
  } catch (error) {
    console.error('Error retrieving Menu_Items:', error);
    return [];
  }
};

export async function findMenuByPk(menuId){
  try {
    const menu = await Menu.findAll({
      where: {
        Menu_Id: menuId
      }
    });
    return menu.map(item => item.toJSON());
  } catch (error) {
    console.error('Error retrieving Menu_Items:', error);
    return [];
  }
};












export async function getMenu() {
  try {
    const menu = await Menu.findAll({
      include: [Menu_Item]
    });
    return menu.map(item => item.toJSON());
  } catch (error) {
    console.error('Error retrieving menu:', error);
    return [];
  }
}


export async function getMenuById(id){
  try{
    const menu = await Menu.findByPk(id);
  }catch(err){
    console.error('Error retrieving menu:', error);
  }  
}


export async function addMenu(item) {
  try {
    const menu = await Menu.create(item);
    console.log('New menu added:', menu.toJSON());
  } catch (error) {
    console.error('Error adding menu:', error);
  }
}

export async function updateMenu(id, updatedMenu) {
  try {
    const menu = await Menu.findByPk(id);
    if (menu) {
      await menu.update(updatedMenu);
      console.log('Menu  updated:', menu.toJSON());
    } else {
      console.error('Menu  not found.');
    }
  } catch (error) {
    console.error('Error updating menu :', error);
  }
}

export async function deleteMenu(id) {
  try {
    const menu = await Menu.findByPk(id);
    if (menu) {
      await menu.destroy();
      console.log('Menu  deleted.');
    } else {
      console.error('Menu  not found.');
    }
  } catch (error) {
    console.error('Error deleting menu:', error);
  }
}

export async function updateMenuItem(id, updatedItem) {
  try {
    const menuItem = await Menu_Item.findByPk(id);
    if (menuItem) {
      await menuItem.update(updatedItem);
      console.log('Menu item updated:', menuItem.toJSON());
    } else {
      console.error('Menu item not found.');
    }
  } catch (error) {
    console.error('Error updating menu item:', error);
  }
}

export async function deleteMenuItem(id) {
  try {
    const menuItem = await Menu_Item.findByPk(id);
    if (menuItem) {
      await menuItem.destroy();
      console.log('Menu item deleted.');
    } else {
      console.error('Menu item not found.');
    }
  } catch (error) {
    console.error('Error deleting menu item:', error);
  }
}

