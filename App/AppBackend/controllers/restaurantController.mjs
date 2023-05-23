import * as Restaurant from '../models/restaurant.mjs' // version 3 with ORM sequelize, postgress
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export async function displayAllRestaurants(req, res){
  console.log("displayAlleRestaurants");
  const restaurants= await Restaurant.getAllRestaurants();
  console.log(restaurants.length);
  res.render("../views/restaurants",{Restaurant: restaurants});
  console.log("entered displayAllRestaurants");
  // next()
}

export async function showRestaurantMenu(req,res){
  try{
    // const restaurant= await Restaurant.getRestaurantById(req.params.restaurantId)
    console.log("entered");
    const menus= await Restaurant.showMenu(req.params.restaurantId)
    console.log("exited");
    res.render('menu-list',{menus:menus});
  }catch(error){
    res.send(error);
  }
}
