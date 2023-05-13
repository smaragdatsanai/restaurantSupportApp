import fs from 'fs';

const menuFilePath = './data/menu.json';

// Get all menu items
export const getAllMenuItems = () => {
  const menuData = fs.readFileSync(menuFilePath);
  return JSON.parse(menuData);
};

// Get menu item by ID
export const getMenuItemById = (id) => {
  const menuData = fs.readFileSync(menuFilePath);
  const menuItems = JSON.parse(menuData);
  return menuItems.find((item) => item.id === id);
};

// Add new menu item
export const addMenuItem = (menuItem) => {
  const menuData = fs.readFileSync(menuFilePath);
  const menuItems = JSON.parse(menuData);
  const newMenuItem = {
    id: menuItems.length + 1,
    ...menuItem,
  };
  menuItems.push(newMenuItem);
  fs.writeFileSync(menuFilePath, JSON.stringify(menuItems));
  return newMenuItem;
};

// Update menu item by ID
export const updateMenuItem = (id, updatedMenuItem) => {
  const menuData = fs.readFileSync(menuFilePath);
  const menuItems = JSON.parse(menuData);
  const index = menuItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    const updatedItem = {
      id,
      ...updatedMenuItem,
    };
    menuItems[index] = updatedItem;
    fs.writeFileSync(menuFilePath, JSON.stringify(menuItems));
    return updatedItem;
  }
  return null;
};

// Delete menu item by ID
export const deleteMenuItem = (id) => {
  const menuData = fs.readFileSync(menuFilePath);
  const menuItems = JSON.parse(menuData);
  const index = menuItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    menuItems.splice(index, 1);
    fs.writeFileSync(menuFilePath, JSON.stringify(menuItems));
    return true;
  }
  return false;
};
