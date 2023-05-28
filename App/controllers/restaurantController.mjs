import * as Restaurant from '../models/restaurant.mjs' 


async function displayAllRestaurants(req, res, next) {
  try {
    console.log("displayAlleRestaurants");
    const restaurants = await Restaurant.getAllRestaurants();
    console.log(restaurants.length);
    res.render("../views/restaurants", { Restaurant: restaurants, Button:'' });
    console.log("entered displayAllRestaurants");
  } catch (error) {
    next(error)
  }
}

async function displayOpenRestaurants(req, res, next) {
  try {
    console.log("displayOpenRestaurants");
    const message = res.locals.message;
    const restaurants = await Restaurant.getOpenRestaurants();
    res.render("../views/restaurants", { Restaurant: restaurants, Button:'active', message});
    console.log("entered displayOpenRestaurants");
  } catch (error) {
    next(error)
  }
}


async function searchRestaurant(req,res,next){
  try {
    console.log("search");
    const name=req.query.restaurantName
    console.log(name)
    const restaurants = await Restaurant.searchRestaurantByName(name)
    console.log("exited");
    res.render("../views/restaurants", { Restaurant: restaurants });
  } catch (error) {
    next(error);
  }
}

export {displayAllRestaurants,searchRestaurant,displayOpenRestaurants}