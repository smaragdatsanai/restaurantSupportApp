import { Owner,User,Restaurant,Review,Menu,Menu_Item } from "./database.mjs";
import { sequelize } from "./dbConfig.mjs";
import { Op } from 'sequelize';
import faker from 'faker';
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

      }catch(error){
        console.error('Error retrieving Restaurant Details:', error);
      }  
}

export async function getOpenRestaurants() {
  try {
    const currentTime = new Date();
    const options = { timeZone: 'Europe/Athens', hour12: false };
    const currentTimeString = currentTime.toLocaleString('en-US', options).substr(11, 8);

    const rest = await Restaurant.findAll({
      where: {
        [Op.or]: [
          {
            Opens_on: {
              [Op.lte]: currentTimeString,
            },
            Closes_at: {
              [Op.gte]: currentTimeString,
            },
          },
          {
            Opens_on: {
              [Op.gte]: sequelize.col('Closes_at'),
            },
            Closes_at: {
              [Op.gte]: currentTimeString,
            },
          },
          {
            Opens_on: {
              [Op.gte]: sequelize.col('Closes_at'),
            },
            Closes_at: {
              [Op.lte]: currentTimeString,
            },
          },
        ],
      },
    });

    console.log(currentTimeString);

    return rest.map((item) => item.toJSON());
  } catch (error) {
    console.error('Error retrieving Restaurants:', error);
  }
}


// Synchronize the models with the database (create the tables if they don't exist)


