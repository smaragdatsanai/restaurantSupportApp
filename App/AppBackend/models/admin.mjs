import {Owner} from "./database.mjs"
import bcrypt from "bcrypt";
import faker from 'faker' 
import { sequelize } from "./dbConfig.mjs";
import { DataTypes } from "sequelize";
import { UUID as uuid} from "sequelize";

export async function addOwner(First_name,Last_name,Phone,Username, Email, password) {
    try {
      const Password_hash = await bcrypt.hash(password, 10);
      const owner = await Owner.create({
        Owner_Id: faker.datatype.uuid(),
        First_Name: First_name,
        Last_Name: Last_name,
        Phone: Phone,
        Username: Username,
        Email: Email,
        Password: Password_hash
      });
      
      return owner; // Return the created owner object
    } catch (error) {
      throw error;
    }
  }
  
  
  export async function login(username,password){
      try {
          if (!username || !password)
              throw new Error("missing username or password")
  
          let owner = await Owner.findOne({ where: { Username: username } })
          
          if (!owner)
              throw new Error("Owner " + username + "doesn't exist")
          if(password==owner.Password){
              return owner
          }
          else
              throw new Error("Wrong credentials")
          
      } catch (error) {
          throw error
      }
  }

  export async function findreviewss (ownerId) {
      
    try {
      const reviews = await sequelize.models.Review.findAll({
        attributes: ['UserUserId', 'Comments', 'Rating'],
        include: [
          {
            model: sequelize.models.MenuItem,
            include: [
              {
                model: sequelize.models.Menu,
                include: [
                  {
                    model: sequelize.models.Restaurant,
                    where: { OwnerId: ownerId }, 
                  },
                ],
              },
            ],
          },
        ],
      });
  
     return reviews;
    } catch (error) {
      console.error(error);
      throw(error);
    }
  };

export async function findMenus (ownerId) {
  try {
    const restaurants = await seqObj.Restaurant.findAll({
      where: {
        Owner_Id: ownerId,
      },
      include: {
        model: seqObj.Menu,
        attributes: ['Name', 'Type'],
        include: {
          model: seqObj.Menu_Item,
          attributes: ['Name', 'Description', 'Price'],
        },
      },
    });

    const menus = restaurants.reduce((result, restaurant) => {
      const restaurantMenus = restaurant.Menus.map((menu) => {
        const menuItems = menu.Menu_Items.map((menuItem) => ({
          Name: menuItem.Name,
          Description: menuItem.Description,
          Price: menuItem.Price,
        }));

        return {
          Name: menu.Name,
          Type: menu.Type,
          MenuItems: menuItems,
        };
      });

      return [...result, ...restaurantMenus];
    }, []);

    return menus;
    
  } catch (error) {
    throw(error);
  }
};
  
export async function addItems (ownerId) {

  try {
    // Find all restaurants associated with the owner
    const restaurants = await sequelize.models.Restaurant.findAll({
      where: { OwnerId: ownerId }, 
      include: [
        {
          model: sequelize.models.Menu,
          include: sequelize.models.MenuItem,
        },
      ],
    });

    // Display the restaurants and their menus
    restaurants.forEach((restaurant) => {
      console.log(`Restaurant ID: ${restaurant.Restaurant_Id}`);
      console.log(`Restaurant Name: ${restaurant.Name}`);
      console.log(`Restaurant Address: ${restaurant.Address}`);

      restaurant.Menus.forEach((menu) => {
        console.log(`Menu ID: ${menu.Menu_Id}`);
        console.log(`Menu Name: ${menu.Name}`);
        console.log(`Menu Type: ${menu.Type}`);

        menu.Menu_Items.forEach((menuItem) => {
          console.log(`Item ID: ${menuItem.Item_Id}`);
          console.log(`Item Name: ${menuItem.Name}`);
          console.log(`Item Description: ${menuItem.Description}`);
          console.log(`Item Price: ${menuItem.Price}`);
          console.log('---');
        });

        console.log('---');
      });

      console.log('---');
    });

    const selectedMenuId = req.body.selectedMenuId;; // Assuming the owner selects a menu by its ID
    const newItemName = req.body.itemName; // Retrieve the new item name from the request body
    const newItemDescription = req.body.itemDescription; // Retrieve the new item description from the request body
    const newItemPrice = req.body.itemPrice; // Retrieve the new item price from the request body

    // Find the selected menu
    const selectedMenu = await sequelize.models.Menu.findByPk(selectedMenuId, {
      include: sequelize.models.MenuItem,
    });

    if (!selectedMenu) {
      console.log('Selected menu not found');
      return;
    }

    // Create a new menu item
    const newItem = await sequelize.models.MenuItem.create({
      Name: newItemName,
      Description: newItemDescription,
      Price: newItemPrice,
      MenuMenuId: selectedMenu.Menu_Id, 
    });

    console.log('New item created:');
    console.log(`Item ID: ${newItem.Item_Id}`);
    console.log(`Item Name: ${newItem.Name}`);
    console.log(`Item Description: ${newItem.Description}`);
    console.log(`Item Price: ${newItem.Price}`);

  } catch (error) {
    throw(error);
  }
};

export async function deleteItem (ownerId,menuItemId) {

  try {
    // Find the owner's restaurant and associated menu item
    const restaurant = await sequelize.models.Restaurant.findOne({
      where: { Owner_Id: ownerId }, 
      include: [
        {
          model: sequelize.models.Menu,
          include: sequelize.models.MenuItem,
          where: { Item_Id: menuItemId }, 
        },
      ],
    });

    if (!restaurant) {
      console.log('Owner or menu item not found');
      return;
    }

    // Delete the menu item
    await sequelize.models.MenuItem.destroy({
      where: { Item_Id: menuItemId }, 
    });

    console.log(`Menu item with ID ${menuItemId} has been deleted`);

  } catch (error) {
    throw(error);
  }
};