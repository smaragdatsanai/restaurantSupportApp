import { Owner,User,Restaurant,Review,Menu,Menu_Item } from "./database.mjs";
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

//when I click on th Restaurant (schedule , ratings, photos etc)
export async function getRestaurantDetailsByPk(resId){
    try{
        const details = await Restaurant.findByPk(resId);
        return details;
      }catch(err){
        console.error('Error retrieving Restaurant Details:', error);
      }  
}
// Synchronize the models with the database (create the tables if they don't exist)


