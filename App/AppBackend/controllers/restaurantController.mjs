import * as Restaurant from '../models/restaurant.mjs' // version 3 with ORM sequelize, postgress

export async function displayAllRestaurants(req, res){
  console.log("displayAlleRestaurants");
  const restaurants= await Restaurant.getAllRestaurants();
  console.log(restaurants.length);
  res.render("../views/restaurants",{Restaurant: restaurants});
  console.log("entered displayAllRestaurants");
  // next()
}

