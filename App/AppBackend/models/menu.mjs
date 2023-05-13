const fs = require('fs');
const path = require('path');

const menuFilePath = path.join(__dirname, '..', 'data', 'menu.json');

class Menu {
  static getMenu() {
    const menu = fs.readFileSync(menuFilePath, 'utf-8');
    return JSON.parse(menu);
  }

  static addMenuItem(item) {
    const menu = this.getMenu();
    menu.push(item);
    fs.writeFileSync(menuFilePath, JSON.stringify(menu));
  }

  static updateMenuItem(id, updatedItem) {
    const menu = this.getMenu();
    const index = menu.findIndex((item) => item.id === id);
    if (index !== -1) {
      menu[index] = updatedItem;
      fs.writeFileSync(menuFilePath, JSON.stringify(menu));
    }
  }

  static deleteMenuItem(id) {
    const menu = this.getMenu();
    const updatedMenu = menu.filter((item) => item.id !== id);
    fs.writeFileSync(menuFilePath, JSON.stringify(updatedMenu));
  }
}

module.exports = Menu;
