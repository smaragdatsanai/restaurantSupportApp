import { Owner,User,Restaurant,Review,Menu,Menu_Item } from "./database.mjs";
import { Op } from 'sequelize';
import faker from 'faker' 
import { sequelize } from "./dbConfig.mjs";
import { DataTypes } from "sequelize";
import { UUID as uuid} from "sequelize";

export async function getAllRestaurants(){
    try {
        console.log("getAllRestaurants");
        const restaurant = await Restaurant.findAll({});
        return restaurant.map(item => item.toJSON());
      } catch (error) {
        console.error('Error retrieving Restaurant:', error);
      }
}

export async function getAllOpenRestaurants(){
    try{
        
    }
    catch{

    }
}

export async function showMenu(resId){
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

export async function searchRestaurantByName(restaurantName){
  try {
    const restaurants = await Restaurant.findAll({
      where: {
        Name:{
          [Op.iLike]: restaurantName // Case-insensitive comparison
        }
      }
    });
    return restaurants.map(item => item.toJSON());
  } catch (error) {
    console.error('Error retrieving restaurants:', error);
    return [];
  }
}

//when I click on th Restaurant (schedule , ratings, photos etc)
export async function getRestaurantById(resId){
    try{
        const rest = await Restaurant.findByPk(resId);
        
        return rest.map(item => item.toJSON());

      }catch(err){
        console.error('Error retrieving Restaurant Details:', error);
      }  
}
// Synchronize the models with the database (create the tables if they don't exist)


