import { Owner,User,Restaurant,Review,Menu,Menu_Item } from "./database.mjs";
import bcrypt from "bcrypt";
import faker from 'faker'
import { sequelize } from "./dbConfig.mjs";
import { DataTypes } from "sequelize";
import { UUID as uuid } from "sequelize";

export async function addOwner(firstName, lastName, phone, email, username, password) {
  try {
    console.log(username, password)
    if (!username || !password)
      throw new Error("missing username or password")
    let owner = await Owner.findOne({ where: { Username: username } })
    
    if (owner)
      throw new Error(`Owner ${username} already exists`)
    const Password_hash = await bcrypt.hash(password, 10)
    owner = await Owner.create({
      Owner_Id: faker.datatype.uuid(),
      First_Name: firstName,
      Last_Name: lastName,
      Phone: phone,
      Email: email,
      Username: username,
      Password: Password_hash
    });
    return owner; // Return the created owner object
  } catch (error) {
    throw error;
  }
}


export async function login(username, password) {
  try {
    if (!username || !password)
      throw new Error("missing username or password")

    let owner = await Owner.findOne({ where: { Username: username } })
    console.log(owner)
    if (!owner)
      throw new Error(`Owner  ${username} doesn't exist`)
      console.log(owner.Password)
      console.log(password)
    const match = await bcrypt.compare(password, owner.Password)
    if (match) {
      return owner
    }
    else
      throw new Error("Wrong credentials")
  } catch (error) {
    throw error
  }
}


export async function getAllAdminRestaurants(userId){
  try{
    const userRestaurants = await Owner.findAll({
      where: {
        Owner_Id: userId
      },
      include: [
        {
          model: Restaurant,
          include: [
            {
              model: Menu
            }
          ]
        }
      ]
    });
    const restaurants = userRestaurants.flatMap(item => item.Restaurants.map(restaurant => restaurant.toJSON()));
    return  restaurants
  }catch (error) {
    console.error('Error retrieving Restaurants:', error);
  }
}

export async function getRestaurantsforGraph() {
  try {
    const restaurants = await Restaurant.findAll({
      include: [
        {
          model: Menu,
          include: [
            {
              model: Menu_Item,
              include: {
                model: Review,
                attributes: [[sequelize.fn('AVG', sequelize.col('Rating')), 'averageRating']],
              },
              attributes: ['Item_Id', 'Name'],
            },
          ],
          attributes: ['Menu_Id', 'Name'],
        },
      ],
      attributes: ['Restaurant_Id', 'Name'],
      group: ['Restaurant.Restaurant_Id', 'Menus.Menu_Id', 'Menus->Menu_Items.Item_Id','Menus->Menu_Items->Reviews.Review_Id'], // Include the Menu_Items.Item_Id in the group array
    });
    const restaurantObjects = restaurants.map(restaurant => ({
      restaurantId: restaurant.Restaurant_Id,
      name: restaurant.Name,
      menus: restaurant.Menus.map(menu => ({
        menuId: menu.Menu_Id,
        menuName: menu.Name,
        menuItems: menu.Menu_Items.map(menuItem => ({
          itemId: menuItem.Item_Id,
          itemName: menuItem.Name,
          averageRating: menuItem.Reviews[0]?.dataValues.averageRating || null,
        })),
      })),
    }));

    return restaurantObjects;
  } catch (error) {
    console.error('Error retrieving Restaurants:', error);
  }
}



export async function addOwnerRestaurant(name,address,opens,closes,type,ownerid,image){
  try{
    await Restaurant.create({
      Restaurant_Id: faker.datatype.uuid(),
      Name: name,
      Address: address,
      Opens_on: opens,
      Closes_at: closes,
      Restaurant_Type: type,
      OwnerId: ownerid,
      Image:image
    });
  }catch(error){
    console.error('Error creating restaurant:',error);
  }
}


export async function addOwnerMenu (name,type,opens,closes,restaurantid,image){
  try{
    await Menu.create ({
      Menu_Id: faker.datatype.uuid(),
      Name: name,
      Type: type,
      Active_from: opens,
      Active_until: closes,
      RestaurantId: restaurantid,
      Image: image

    });
    
  }catch(error){
    console.error('Error creating menu:',error);
  }
}

export async function addMenuItem (name,description,price,menuid,image){
  try{
    await Menu_Item.create({
      Item_Id : faker.datatype.uuid(),
      Name: name,
      Description: description,
      Price: price,
      MenuId: menuid,
      Image:image
    });                     
  }catch(error){
    console.error('Error adding Item:',error);
  }
}


export async function deleteMenuItem (itemId){
  try {
    const menuItem = await Menu_Item.findByPk(itemId);
    if (!menuItem) {
      throw new Error('Menu item not found');
    }
    await menuItem.destroy();
    console.log('Menu item deleted successfully');
  } catch (error) {
    console.error('Error deleting menu item:', error);
  }
}

export async function deleteRestaurantById(restaurantId) {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    
    const menus = await Menu.findAll({
      where: {
        RestaurantId: restaurantId
      }
    });

    const menuIds = menus.map(menu => menu.Menu_Id);
    
    await Menu_Item.destroy({
      where: {
        MenuId: menuIds
      }
    });
    
    await Menu.destroy({
      where: {
        RestaurantId: restaurantId
      }
    });
    
    await restaurant.destroy();
    console.log('Restaurant, menus, and menu items deleted successfully');
  } catch (error) {
    console.error('Error deleting restaurant:', error);
  }
}


export async function deleteRestaurantMenu(menuId) {
  try {
    const menu = await Menu.findByPk(menuId);
    if (!menu) {
      throw new Error('menu not found');
    }
    
    await Menu_Item.destroy({
      where: {
        MenuId: menuId
      }
    });
    
    await menu.destroy();
    console.log('menus, and menu items deleted successfully');
  } catch (error) {
    console.error('Error deleting menu:', error);
  }
}